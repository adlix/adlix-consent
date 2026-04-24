/**
 * Seed-Script: UI-Texte nach Strapi (de + en)
 * Key = deutscher Text (Fallback = Auto-Register via t())
 */

import 'dotenv/config';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.STRAPI_TOKEN || '';

if (!STRAPI_TOKEN) {
  console.error('❌ Bitte STRAPI_API_TOKEN in .env setzen');
  process.exit(1);
}

// Key = deutscher Text, value = { text: de, translation: en }
const translations: Record<string, string> = {
  // === HomeTemplate ===
  "Börse einfach erklärt -": "Markets explained -",
  "ohne Umwege.": "without detours.",
  "Jetzt Aktie suchen": "Search a stock",
  "Kostenlos registrieren": "Create free account",
  "Keine Anlageberatung": "No investment advice",
  "100 % unabhängig": "100% independent",
  "Börse verstehen und besser investieren": "Understand markets and invest better",
  "Schnellzugriff": "Quick access",
  "Tools, die sofort helfen - ohne Einrichtung": "Tools that help instantly",
  "Gewinner und Verlierer": "Winners and losers",
  "Top Movers heute": "Top movers today",
  "Alle Aktien": "All stocks",
  "Top Gewinner": "Top gainers",
  "Top Verlierer": "Top losers",
  "Mehr erfahren": "Learn more",
  "Zur Detailseite": "Go to detail page",
  "Keine Instrumente verfügbar.": "No instruments available.",
  "Instrumente entdecken": "Explore instruments",
  "Zum Login": "Go to login",
  "Startseite": "Home",
  "Screener": "Screener",
  "Märkte": "Markets",
  "Watchlist": "Watchlist",
  "Anmelden": "Login",
  "Registrieren": "Register",
  "Suchen": "Search",
  "Filter": "Filter",
  "Filter zurücksetzen": "Reset filters",
  "Filter anwenden": "Apply filters",
  "Ergebnisse": "Results",
  "Laden...": "Loading...",
  "Fehler": "Error",
  "Keine Ergebnisse gefunden": "No results found",
  "Speichern": "Save",
  "Abbrechen": "Cancel",
  "Bestätigen": "Confirm",
  "Schließen": "Close",
  "Zurück": "Back",
  "Weiter": "Next",
  "Absenden": "Submit",
  "Impressum": "Imprint",
  "Datenschutz": "Privacy",
  "Kontakt": "Contact",
  "Instrumente gesamt": "Total instruments",
  "Länder": "Countries",
  "Sektoren": "Sectors",
  "Börsenplätze": "Exchanges",
  "im Feed": "in feed",
  "Instrumente": "Instruments",
  "Aktien-Screener": "Stock Screener",
  "Finde unterbewertete Aktien mit professionellen Filtern": "Find undervalued stocks with professional filters",
  "Suche nach Name oder Symbol...": "Search by name or symbol...",
  "Zur Watchlist hinzufügen": "Add to watchlist",
  "Von Watchlist entfernen": "Remove from watchlist",
  "Abmelden": "Logout",
  "Direkt aus Strapi": "Directly from Strapi",
  "Instrumente im Fokus": "Featured instruments",
  "Finanzprodukte": "Financial products",
  "Finanzprodukte entdecken": "Discover product categories",
  "Marktüberblick": "Market overview",
  "Was bewegt die Märkte?": "What moves the markets?",
  "Top-Sektoren im aktuellen Feed": "Top sectors in the current feed",
  "In wenigen Klicks vom ersten Eindruck zur Detailanalyse.": "From first impression to deep analysis in a few clicks.",
};

async function createOrUpdateUiText(code: string, text_de: string, text_en: string, page: string) {
  const checkRes = await fetch(`${STRAPI_URL}/api/ui-texts?filters[code][$eq]=${encodeURIComponent(code)}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  });
  const checkData = await checkRes.json();
  
  const existing = checkData.data?.[0];
  
  if (existing) {
    // Update nur falls needed
    console.log(`  🔄 Exists: ${code.substring(0, 40)}...`);
  } else {
    const createRes = await fetch(`${STRAPI_URL}/api/ui-texts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { code: text_de, text: text_de, page },
      }),
    });
    if (createRes.ok) {
      console.log(`  ✅ Created: ${code.substring(0, 40)}...`);
    } else {
      console.log(`  ❌ Failed: ${code.substring(0, 40)}...`);
    }
  }
}

async function main() {
  console.log(`🚀 Seeding ${Object.keys(translations).length} UI-Texte nach Strapi (nur DE)...\n`);
  
  // Erst DE keys erstellen
  const pages = new Set<string>();
  for (const code of Object.keys(translations)) {
    // Seite aus dem Text ableiten (einfache Heuristik)
    const page = code.includes("Screener") ? "screener" 
      : code.includes("Filter") || code.includes("Ergebnis") ? "screener"
      : code.includes("Watchlist") || code.includes("Anmelden") || code.includes("Registrieren") ? "nav"
      : code.includes("Impressum") || code.includes("Datenschutz") ? "footer"
      : "home";
    pages.add(page);
    await createOrUpdateUiText(code, code, translations[code], page);
  }
  
  console.log('\n✅ DE-Seed abgeschlossen!');
  console.log('Hinweis: EN-Übersetzungen werden über Strapi i18n verwaltet (nicht im code hinterlegt).');
  console.log('Fallback: t("deutscher text") → wenn nicht in Strapi → zeigt deutschen Text + registriert automatisch.');
}

main().catch(console.error);