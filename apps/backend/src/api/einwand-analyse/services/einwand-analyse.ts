import type { Strapi } from '@strapi/strapi';

const SYSTEM_PROMPT = `Du bist ein Experte für Soziokratie und Konsent-basierte Entscheidungsfindung.
Analysiere den folgenden Einwand eines Teilnehmers in einem Konsent-Prozess.

Prüfe den Einwand anhand der 4 soziokratischen Validitätskriterien:
1. Explicit: Kann die Person einen konkreten, spezifischen Fall machen? (nicht vage oder allgemein)
2. Impersonal: Betrifft es das gemeinsame Ziel des Kreises — keine persönliche Präferenz?
3. Evidenced: Basiert es auf Erfahrung oder konkreter Evidenz — nicht nur auf einer Vorahnung?
4. Not safe to fail: Würde es tatsächlich Schaden verursachen — kein reiner "bessere Idee"-Einwand?

Antworte AUSSCHLIESSLICH mit einem JSON-Objekt (kein Markdown, keine Erklärungen):
{
  "kernproblem": "Du machst dir Sorgen, dass ...",
  "validitaet": {
    "explicit": true,
    "impersonal": true,
    "evidenced": false,
    "not_safe_to_fail": true
  },
  "rueckmeldung": "valide",
  "schaerfungsfragen": [
    "Frage 1",
    "Frage 2",
    "Frage 3"
  ]
}

Gültige Werte für rueckmeldung: "valide" | "eher_andere_idee" | "unklar"
- "valide": Einwand erfüllt die soziokratischen Kriterien (mindestens 3 von 4)
- "eher_andere_idee": Klingt mehr nach einer Verbesserungsidee oder persönlichen Präferenz
- "unklar": Zu wenig Informationen um den Einwand einzuschätzen`;

const FALLBACK_RESPONSE = {
  kiVerfuegbar: false,
  manuell: true,
  hinweis: 'KI-Analyse momentan nicht verfügbar. Bitte prüfe deinen Einwand manuell anhand der 4 Validitätskriterien: Explicit, Impersonal, Evidenced, Not safe to fail.',
};

export default ({ strapi }: { strapi: Strapi }) => ({
  async analyse(einwandText: string) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return FALLBACK_RESPONSE;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: einwandText },
          ],
        }),
      });

      if (!response.ok) {
        strapi.log.warn(`[einwand-analyse] OpenAI API error: ${response.status} ${response.statusText}`);
        return FALLBACK_RESPONSE;
      }

      const data = (await response.json()) as any;
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      const parsed = JSON.parse(content);

      return {
        kiVerfuegbar: true,
        kiEinschaetzung: true,
        kernproblem: parsed.kernproblem ?? '',
        validitaet: {
          explicit: Boolean(parsed.validitaet?.explicit),
          impersonal: Boolean(parsed.validitaet?.impersonal),
          evidenced: Boolean(parsed.validitaet?.evidenced),
          not_safe_to_fail: Boolean(parsed.validitaet?.not_safe_to_fail),
        },
        rueckmeldung: (['valide', 'eher_andere_idee', 'unklar'] as const).includes(parsed.rueckmeldung)
          ? parsed.rueckmeldung
          : 'unklar',
        schaerfungsfragen: Array.isArray(parsed.schaerfungsfragen)
          ? (parsed.schaerfungsfragen as string[]).slice(0, 3)
          : [],
      };
    } catch (error) {
      strapi.log.error('[einwand-analyse] Service error:', error);
      return FALLBACK_RESPONSE;
    }
  },
});
