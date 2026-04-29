import type { Strapi } from '@strapi/strapi';

const SYSTEM_PROMPT = `Du bist ein Experte für Soziokratie und Konsent-basierte Entscheidungsfindung.
Deine Aufgabe ist es, eine Synthese aus einem Einwand und mehreren Lösungsideen aus einem Dialog zu erstellen.

Du erhältst:
1. Einen Einwand (das Problem, das integriert werden muss)
2. Mehrere Lösungsideen aus dem Dialog (Phase "Lösungsraum", Phase 3)

Erstelle einen integrierten Entwurf, der:
- Den Kern des Einwands aufgreift und adressiert
- Die besten Aspekte der Ideen kombiniert
- Als konkreter Anpassungsvorschlag für das ursprüngliche Vorhaben dient

Antworte AUSSCHLIESSLICH mit einem JSON-Objekt (kein Markdown, keine Erklärungen davor/danach):
{
  "kernspannungen": "Was ist eigentlich das Problem? Präzise Beschreibung der Kernspannung hinter dem Einwand (2-3 Sätze).",
  "integrierterEntwurf": "Der angepasste Vorschlag, der Einwand und Ideen integriert. Konkret, handlungsorientiert, sofort umsetzbar.",
  "transparenzLog": [
    { "idee": "Die Idee aus dem Dialog (wörtlich oder sinngemäß)", "aenderung": "Welche konkrete Änderung diese Idee im Entwurf bewirkt hat" }
  ],
  "ungelosteSpannung": null
}

Regeln:
- kernspannungen: max. 3 Sätze, präzise auf den Punkt
- integrierterEntwurf: klar strukturiert, keine vagen Formulierungen
- transparenzLog: ein Eintrag pro berücksichtigter Idee (nicht berücksichtigte Ideen weglassen)
- ungelosteSpannung: null wenn vollständig integriert, sonst kurze Beschreibung was offen bleibt`;

const FALLBACK_RESPONSE = {
  kiVerfuegbar: false,
  manuell: true,
  status: 'entwurf',
  hinweis:
    'KI-Synthese momentan nicht verfügbar. Bitte führe die Einwands-Synthese manuell durch: Analysiere gemeinsam den Einwand und die Lösungsideen, um einen integrierten Entwurf zu erarbeiten.',
};

export default ({ strapi }: { strapi: Strapi }) => ({
  async synthese(dialogId: string) {
    const dialog = await strapi.documents('api::dialog.dialog').findOne({
      documentId: dialogId,
      populate: {
        objection: true,
        project: true,
        phases: {
          populate: {
            beitraege: true,
          },
        },
      },
    });

    if (!dialog) {
      return { error: 'Dialog nicht gefunden.' };
    }

    if (!dialog.objection) {
      return { error: 'Dialog hat keinen zugeordneten Einwand.' };
    }

    const phases = (dialog.phases as any[]) ?? [];
    const solutionsPhase = phases.find((p) => p.type === 'solutions');

    if (!solutionsPhase) {
      return { error: 'Lösungsphase (Phase 3) noch nicht gestartet.' };
    }

    const beitraege = (solutionsPhase.beitraege as any[]) ?? [];
    const ideas = beitraege
      .filter((b) => b.type === 'idea' && b.content?.trim())
      .map((b) => b.content.trim());

    if (ideas.length === 0) {
      return { error: 'Keine Lösungsideen (type: idea) in Phase 3 vorhanden.' };
    }

    const objectionText = (dialog.objection as any).reason as string;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      strapi.log.warn('[dialog-synthese] OPENAI_API_KEY nicht gesetzt — Fallback aktiv.');
      return {
        ...FALLBACK_RESPONSE,
        dialogId,
        einwand: objectionText,
        ideen: ideas,
      };
    }

    const userMessage = [
      `Einwand:\n${objectionText}`,
      `\nLösungsideen aus dem Dialog (Phase 3):\n${ideas.map((idea, i) => `${i + 1}. ${idea}`).join('\n')}`,
    ].join('\n');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.3,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        strapi.log.warn(`[dialog-synthese] OpenAI API error: ${response.status} ${response.statusText}`);
        return { ...FALLBACK_RESPONSE, dialogId };
      }

      const data = (await response.json()) as any;
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Leere Antwort von OpenAI');
      }

      const parsed = JSON.parse(content);

      return {
        kiVerfuegbar: true,
        status: 'entwurf',
        dialogId,
        einwand: objectionText,
        kernspannungen: parsed.kernspannungen ?? '',
        integrierterEntwurf: parsed.integrierterEntwurf ?? '',
        transparenzLog: Array.isArray(parsed.transparenzLog)
          ? (parsed.transparenzLog as { idee: string; aenderung: string }[]).map((entry) => ({
              idee: String(entry.idee ?? ''),
              aenderung: String(entry.aenderung ?? ''),
            }))
          : [],
        ungelosteSpannung: parsed.ungelosteSpannung ?? null,
      };
    } catch (error) {
      strapi.log.error('[dialog-synthese] Service error:', error);
      return { ...FALLBACK_RESPONSE, dialogId };
    }
  },
});
