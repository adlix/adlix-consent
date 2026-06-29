import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Elemental LifeCoach — Der Weg zur Vision',
  description:
    'Die Elemente als Kompass für Selbstfindung und Visionssuche. Bodenständig. Praktisch. Klar.',
  alternates: { canonical: '/elemental' },
}

// ─── Data ───────────────────────────────────────────────────────────────────

const problems = [
  {
    icon: '🌀',
    title: 'Du weißt nicht, wohin.',
    text: 'Alles ist in Bewegung — aber die Richtung fehlt. Du spürst, dass da mehr ist. Aber was genau?',
  },
  {
    icon: '⚡',
    title: 'Du bist erschöpft.',
    text: 'Du gibst und gibst. Irgendwann kommt nichts mehr. Die Lebenskraft ist weg — und damit die Ideen.',
  },
  {
    icon: '🚧',
    title: 'Etwas hält dich zurück.',
    text: 'Du weißt, was du tun könntest. Aber dann kommt der innere Stopp. Einwände, die nicht von außen kommen.',
  },
  {
    icon: '🌫️',
    title: '„Alles gut" — aber es ist nicht gut.',
    text: 'Du sagst es anderen. Aber du spürst es selbst: Da fehlt etwas. Echte Klarheit. Ein echter Ruf.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Mentalübungen',
    subtitle: 'Klarheit über Glaubenssysteme',
    description:
      'Die Luft des Nordens reinigt den Geist. Was denkst du über dich selbst — und was denken andere über dich? Einwände lösen sich, wenn sie ans Licht kommen.',
    keywords: ['Luft', 'Nord', 'Glaubenssysteme', 'Klarheit'],
    color: 'from-slate-100 to-slate-50',
    border: 'border-slate-200',
    textAccent: 'text-slate-600',
  },
  {
    number: '02',
    title: 'Lebenskraft anheben',
    subtitle: 'Kraft & Flow — raus aus der Erstarrung',
    description:
      'Die Erde des Westens und das Wasser des Südens in Balance. Dein Körper hat Antworten. Deine Emotionen sind der Kompass. Beides zusammen ergibt Lebenskraft.',
    keywords: ['Erde', 'Wasser', 'Westen', 'Süden', 'Kraft', 'Flow'],
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    textAccent: 'text-amber-700',
  },
  {
    number: '03',
    title: 'Hemmnisse auflösen',
    subtitle: 'Hypnose — Schatten integrieren',
    description:
      'Jede Richtung hat eine dunkle Seite. Nicht falsch — nur unbeleuchtet. Was dich blockiert, wird sichtbar. Und dann losgelassen.',
    keywords: ['Hypnose', 'Schatten', 'Integration', 'Befreiung'],
    color: 'from-indigo-50 to-purple-50',
    border: 'border-indigo-200',
    textAccent: 'text-indigo-700',
  },
  {
    number: '04',
    title: 'Visionssuche',
    subtitle: 'Die Krönung — dein Zentrum',
    description:
      'Im Zentrum des Elementekreises: Deine Lebenskraft. Dein Standpunkt. Dein Ruf. Die Vision ist nicht erfunden — sie war schon immer da. Jetzt ist sie da.',
    keywords: ['Vision', 'Zentrum', 'Schöpferkraft', 'Berufung'],
    color: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    textAccent: 'text-emerald-700',
    highlight: true,
  },
]

const services = [
  {
    icon: '👐',
    title: 'Shiatsu & Seiki',
    desc: 'Körperarbeit, die den Atem anregt und Blockaden in den Meridianen löst. Sanft, tief, wirksam.',
    tag: 'Körperarbeit',
  },
  {
    icon: '🌊',
    title: 'Hypnose & Rückführung',
    desc: 'Zugang zu dem, was unter der Oberfläche liegt. Keine Analyse — ein Erleben. Was dich bremst, wird sichtbar.',
    tag: 'Tiefenarbeit',
  },
  {
    icon: '🌀',
    title: 'Yager-Code',
    desc: 'Unbewusste Programmierung aufdecken und verändern. Glaubenssätze, die nicht die eigenen sind — loslassen.',
    tag: 'Transformation',
  },
  {
    icon: '🌿',
    title: 'Naturzeremonien',
    desc: 'Rituale in der Natur. Kraftort-Arbeit. Was in der Stille entsteht, trägt oft länger als jedes Gespräch.',
    tag: 'Ritual',
  },
  {
    icon: '💨',
    title: 'Mesmerismus',
    desc: 'Die Kunst, den natürlichen Magnetismus des Körpers zu nutzen. Kraft fließen lassen — nicht erzwingen.',
    tag: 'Energiearbeit',
  },
  {
    icon: '🔮',
    title: 'Medizinrad',
    desc: 'Die vier Richtungen als Kompass. Jede Richtung trägt eine Botschaft. Dein Thema bekommt einen Platz im Kreis.',
    tag: 'Orakel & Weg',
  },
]

const faqs = [
  {
    q: 'Brauche ich Vorkenntnisse?',
    a: 'Nein. Jeder Weg beginnt dort, wo du stehst. Vorkenntnisse in Meditation, Spiritualität oder Körperarbeit sind hilfreich — aber nicht nötig.',
  },
  {
    q: 'Wie läuft eine Session ab?',
    a: 'Jede Begleitung ist individuell. Im Erstgespräch (30 Min, kostenlos) klären wir: Wo stehst du? Was brauchst du? Welcher Weg passt?',
  },
  {
    q: 'Was ist der Unterschied zwischen Coaching und spiritueller Begleitung?',
    a: 'Coaching arbeitet an konkreten Zielen. Spirituelle Begleitung geht tiefer — an die Wurzeln. Beides kann sich ergänzen. Im Gespräch finden wir den richtigen Einstieg.',
  },
  {
    q: 'Ich bin skeptisch — ist das nicht esoterisch?',
    a: 'Verständlich. Ich arbeite bodenständig, logisch, praktisch. Die Elemente sind ein Kompass — nicht Magie. Was wirkt, hat eine innere Logik. Was keine hat, lassen wir weg.',
  },
  {
    q: 'Was ist mit „Visionssuche"?',
    a: 'Die Visionssuche ist ein strukturiertes Begleitformat — 4 Sitzungen über 4–6 Wochen. Am Ende steht deine persönliche Vision: Klar, verankert, umsetzbar. 880 EUR. Über Kit.com buchbar.',
  },
]

const prices = [
  {
    name: 'Erstgespräch',
    price: 'kostenlos',
    duration: '30 Min',
    desc: 'Kennenlernen. Klären, wo du stehst und welcher Weg passt.',
    cta: 'Termin buchen',
    ctaLink: 'https://kit.com/matthias-zillig/erstgespraech',
    highlight: false,
  },
  {
    name: 'Einzelsitzung',
    price: 'ab 90',
    duration: '60–90 Min',
    desc: 'Shiatsu, Hypnose, Yager-Code oder Mesmerismus — je nach Bedarf.',
    cta: 'Termin buchen',
    ctaLink: 'https://kit.com/matthias-zillig/einzelsitzung',
    highlight: false,
  },
  {
    name: 'Visionssuche',
    price: '880',
    duration: '4 Sitzungen / 4–6 Wochen',
    desc: 'Der vollständige Weg: Mentalübungen, Lebenskraft, Hemmnisse auflösen, Vision finden. Im Zentrum angekommen.',
    cta: 'Jetzt starten',
    ctaLink: 'https://kit.com/matthias-zillig/visionssuche',
    highlight: true,
    tag: 'Empfohlen',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function ElementalPage() {
  return (
    <div className="min-h-screen" style={{ background: '#faf9f5', color: '#1a1a18' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(250,249,245,0.92)',
          borderColor: '#e5e3dc',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              🌿
            </span>
            <span className="font-semibold" style={{ color: '#2d3a2e' }}>
              Elemental
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#weg" className="hover:opacity-70" style={{ color: '#5a5a52' }}>
              Der Weg
            </a>
            <a href="#angebote" className="hover:opacity-70" style={{ color: '#5a5a52' }}>
              Angebote
            </a>
            <a href="#vision" className="hover:opacity-70" style={{ color: '#5a5a52' }}>
              Visionssuche
            </a>
            <a href="#ueber" className="hover:opacity-70" style={{ color: '#5a5a52' }}>
              Über mich
            </a>
            <a
              href="https://kit.com/matthias-zillig/erstgespraech"
              className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: '#2d3a2e' }}
            >
              Erstgespräch
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{ background: '#e8ede7', color: '#3d5a3e' }}
            >
              <span>🌿</span> Ganzheitliche Begleitung bei Lebensübergängen
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ color: '#1a1a18' }}
            >
              Weißt du, <span style={{ color: '#3d6a40' }}>wo dein Zentrum ist</span>?
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#5a5a52' }}>
              Wenn alles in Bewegung ist — aber die Richtung fehlt. Wenn du spürst, dass da mehr ist
              — aber nicht weißt, was. Die Elemente helfen dir, deine eigene Landkarte zu lesen.
              Nicht als Theorie. Als Weg.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#vision"
                className="px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: '#2d3a2e' }}
              >
                Visionssuche starten →
              </a>
              <a
                href="#weg"
                className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-gray-50"
                style={{ borderColor: '#d4d1c8', color: '#3a3a32' }}
              >
                Der Weg
              </a>
            </div>
          </div>

          {/* Element Circle Visual */}
          <div className="flex justify-center">
            <div className="relative w-72 h-72">
              {/* Center */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center z-10"
                style={{ background: '#faf9f5', border: '2px solid #d4d1c8' }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs font-semibold" style={{ color: '#3d6a40' }}>
                    Zentrum
                  </div>
                  <div className="text-xs" style={{ color: '#8a8a7e' }}>
                    Lebenskraft
                  </div>
                </div>
              </div>

              {/* North — Luft / Glaubenssysteme */}
              <div
                className="absolute w-20 h-20 rounded-full flex items-center justify-center shadow-sm border-2 z-20"
                style={{
                  top: '0',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#f1f4ef',
                  borderColor: '#c4cdc2',
                }}
              >
                <div className="text-center">
                  <div className="text-lg">💨</div>
                  <div className="text-[10px] font-semibold" style={{ color: '#5a7a5e' }}>
                    Norden
                  </div>
                  <div className="text-[9px]" style={{ color: '#8a9a8e' }}>
                    Luft
                  </div>
                </div>
              </div>

              {/* South — Wasser / Emotionen */}
              <div
                className="absolute w-20 h-20 rounded-full flex items-center justify-center shadow-sm border-2 z-20"
                style={{
                  bottom: '0',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  background: '#e8f0f4',
                  borderColor: '#b8c8d0',
                }}
              >
                <div className="text-center">
                  <div className="text-lg">💧</div>
                  <div className="text-[10px] font-semibold" style={{ color: '#4a7a9a' }}>
                    Süden
                  </div>
                  <div className="text-[9px]" style={{ color: '#7a9aaa' }}>
                    Wasser
                  </div>
                </div>
              </div>

              {/* West — Erde / Tun */}
              <div
                className="absolute w-20 h-20 rounded-full flex items-center justify-center shadow-sm border-2 z-20"
                style={{
                  top: '50%',
                  left: '0',
                  transform: 'translate(-50%, -50%)',
                  background: '#f4ede8',
                  borderColor: '#d8c8b8',
                }}
              >
                <div className="text-center">
                  <div className="text-lg">🌍</div>
                  <div className="text-[10px] font-semibold" style={{ color: '#7a5a3a' }}>
                    Westen
                  </div>
                  <div className="text-[9px]" style={{ color: '#9a8a7a' }}>
                    Erde
                  </div>
                </div>
              </div>

              {/* East — Feuer / Spirit */}
              <div
                className="absolute w-20 h-20 rounded-full flex items-center justify-center shadow-sm border-2 z-20"
                style={{
                  top: '50%',
                  right: '0',
                  transform: 'translate(50%, -50%)',
                  background: '#f8ece4',
                  borderColor: '#e0c8b0',
                }}
              >
                <div className="text-center">
                  <div className="text-lg">🔥</div>
                  <div className="text-[10px] font-semibold" style={{ color: '#8a4a2a' }}>
                    Osten
                  </div>
                  <div className="text-[9px]" style={{ color: '#aa7a5a' }}>
                    Feuer
                  </div>
                </div>
              </div>

              {/* Connecting lines (subtle) */}
              <svg
                className="absolute inset-0 z-0"
                viewBox="0 0 288 288"
                fill="none"
                stroke="#d4d1c8"
                strokeWidth="1"
                strokeDasharray="4 4"
              >
                <circle cx="144" cy="144" r="90" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="border-t" style={{ borderColor: '#e5e3dc', background: '#f2f0ea' }}>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl mb-12">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: '#8a8a7e' }}
            >
              Klingt bekannt?
            </p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1a1a18' }}>
              Wenn der Kompass nicht mehr zeigt.
            </h2>
            <p className="text-base" style={{ color: '#5a5a52' }}>
              Viele Menschen kommen nicht, weil etwas kaputt ist. Sondern weil sie spüren: Da fehlt
              etwas. Eine Richtung. Eine Klarheit. Ein Gefühl, das sie noch nicht benennen können.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map(({ icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl p-5"
                style={{ background: '#faf9f5', border: '1px solid #e5e3dc' }}
              >
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: '#1a1a18' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6a6a62' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-10 p-6 rounded-xl"
            style={{ background: '#e8ede7', border: '1px solid #c8d4c2' }}
          >
            <p className="text-base" style={{ color: '#3a4a38' }}>
              <strong>Die gute Nachricht:</strong> Du brauchst keine neue Persönlichkeit. Du
              brauchst keine Lösung von außen. Du brauchst einen Kompass — und die Elemente sind
              einer der ältesten, die es gibt. Praktisch. Bodenständig. Logisch.
            </p>
          </div>
        </div>
      </section>

      {/* ── Der Weg ── */}
      <section id="weg" className="border-t" style={{ borderColor: '#e5e3dc' }}>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: '#8a8a7e' }}
            >
              4 Schritte
            </p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1a1a18' }}>
              Der Elementekreis als Weg zur Vision
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#5a5a52' }}>
              Jede Richtung hat eine Botschaft. Jeder Schritt baut auf dem vorherigen auf. Am Ende
              steht dein Zentrum — mit Klarheit, Kraft und einer Vision, die trägt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map(
              ({
                number,
                title,
                subtitle,
                description,
                keywords,
                color,
                border,
                textAccent,
                highlight,
              }) => (
                <div
                  key={number}
                  className={`rounded-2xl p-6 border ${highlight ? 'ring-2' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${color.replace('from-', '').split(' ')[0].replace('-50', '.5')}, white)`,
                    borderColor: highlight ? '#3d6a40' : undefined,
                    border: highlight ? '2px solid #3d6a40' : `1px solid ${border.split('-')[1]}`,
                    ...(highlight
                      ? { background: 'linear-gradient(135deg, #e8f2ec, #f0f7f2)' }
                      : {}),
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className="text-xs font-mono font-medium px-2 py-0.5 rounded"
                        style={{ background: 'rgba(0,0,0,0.06)', color: '#5a5a52' }}
                      >
                        {number}
                      </span>
                      <h3 className="text-xl font-bold mt-2" style={{ color: '#1a1a18' }}>
                        {title}
                      </h3>
                      <p className={`text-sm font-medium ${textAccent}`}>{subtitle}</p>
                    </div>
                    {highlight && (
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ background: '#3d6a40', color: 'white' }}
                      >
                        Krönung
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#5a5a52' }}>
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((k) => (
                      <span
                        key={k}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.05)', color: '#6a6a62' }}
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-base mb-4" style={{ color: '#5a5a52' }}>
              All das in einem Paket:{' '}
              <strong style={{ color: '#1a1a18' }}>Visionssuche — 4 Sitzungen, 880 EUR</strong>
            </p>
            <a
              href="#vision"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: '#2d3a2e' }}
            >
              Zum Angebot ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Angebote / Services ── */}
      <section
        id="angebote"
        className="border-t"
        style={{ borderColor: '#e5e3dc', background: '#f2f0ea' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: '#8a8a7e' }}
            >
              Einzelangebote
            </p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1a1a18' }}>
              Methoden — ausgewählt, nicht gesammelt
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#5a5a52' }}>
              Jede Methode hat ihren Platz im Elementekreis. Nicht alles passt zu jedem Menschen —
              im Erstgespräch finden wir heraus, was für dich der richtige Einstieg ist.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(({ icon, title, desc, tag }) => (
              <div
                key={title}
                className="rounded-xl p-5"
                style={{ background: '#faf9f5', border: '1px solid #e5e3dc' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{icon}</div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#e8ede7', color: '#5a7a5e' }}
                  >
                    {tag}
                  </span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#1a1a18' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6a6a62' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visionssuche Premium ── */}
      <section
        id="vision"
        className="border-t"
        style={{ borderColor: '#e5e3dc', background: '#1a2e1c' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#a8c8a0' }}
            >
              <span>✦</span> Premium-Begleitung
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Die Visionssuche</h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#a8b8a4' }}>
              4 strukturierte Sitzungen über 4–6 Wochen. Der vollständige Weg: Vom Elementekreis zur
              persönlichen Vision. Im Zentrum angekommen — mit Klarheit, Kraft und einem Ruf, der
              trägt.
            </p>
          </div>

          {/* What's included */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              {
                step: '①',
                title: 'Mentalübungen',
                desc: 'Nord + Ost: Klarheit über Glaubenssysteme, Offenheit für das, was ruft.',
              },
              {
                step: '②',
                title: 'Lebenskraft',
                desc: 'West + Süd: In die Kraft kommen, in den Flow. Bewegungsblockaden lösen.',
              },
              {
                step: '③',
                title: 'Hemmnisse',
                desc: 'Schatten der Richtungen integrieren. Was blockiert, wird sichtbar — und losgelassen.',
              },
              {
                step: '④',
                title: 'Vision',
                desc: 'Im Zentrum angekommen. Deine Vision — klar, verankert, umsetzbar.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={title}
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div className="text-2xl mb-3 text-white">{step}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a8b8a4' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div
            className="max-w-lg mx-auto rounded-2xl p-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div className="text-sm mb-2" style={{ color: '#8a9a84' }}>
              4 Sitzungen · 4–6 Wochen
            </div>
            <div className="text-5xl font-bold text-white mb-1">880 €</div>
            <div className="text-sm mb-8" style={{ color: '#6a7a64' }}>
              Einmalig. Über Kit.com buchbar.
            </div>

            <a
              href="https://kit.com/matthias-zillig/visionssuche"
              className="block w-full py-4 rounded-xl font-semibold text-center text-white mb-4 transition-opacity hover:opacity-90"
              style={{ background: '#3d6a40' }}
            >
              Visionssuche starten →
            </a>

            <p className="text-xs" style={{ color: '#6a7a64' }}>
              Kostenloses Erstgespräch vorab:{' '}
              <a
                href="https://kit.com/matthias-zillig/erstgespraech"
                style={{ color: '#a8c8a0', textDecoration: 'underline' }}
              >
                Termin vereinbaren
              </a>
            </p>
          </div>

          {/* Other pricing */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {prices
              .filter((p) => !p.highlight)
              .map(({ name, price, duration, desc, cta, ctaLink }) => (
                <div
                  key={name}
                  className="rounded-xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{name}</h3>
                    <div className="text-right">
                      <div className="font-bold text-white">{price}</div>
                      <div className="text-xs" style={{ color: '#6a7a64' }}>
                        {duration}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-4" style={{ color: '#a8b8a4' }}>
                    {desc}
                  </p>
                  <a
                    href={ctaLink}
                    className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
                  >
                    {cta} ↗
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Über mich ── */}
      <section id="ueber" className="border-t" style={{ borderColor: '#e5e3dc' }}>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: '#8a8a7e' }}
              >
                Über mich
              </p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1a1a18' }}>
                Matthias Zillig
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#5a5a52' }}>
                <p>
                  Ich begleite Menschen in Lebensübergängen — nicht als Therapeut, sondern als
                  Wegbegleiter. Mit den Elementen als Kompass, mit Shiatsu als Körperarbeit, mit
                  Hypnose als Tiefenarbeit, mit Zeremonien als Kraftort.
                </p>
                <p>
                  Meine Arbeit ist bodenständig und praktisch. Was wirkt, hat eine innere Logik. Ich
                  frage nach dem Warum — und nach dem, was dahinter liegt. Ich arbeite nicht mit
                  fertigen Lösungen, sondern mit dem, was du mitbringst.
                </p>
                <p>
                  Gleichzeitig ist meine Arbeit von einem spirituellen Kern getragen:{' '}
                  <em>Omitakuyasin</em> — Wir sind alle verbunden. Jeder Mensch, der seinen Weg
                  findet, stärkt das Ganze. Deshalb sind die Problemlöser e.V. und die
                  Consent-Plattform keine separaten Projekte — sie sind derselbe Impuls in anderer
                  Form.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  'Shiatsu Practitioner',
                  'Hypnose',
                  'Yager-Code',
                  'Mesmerismus',
                  'Medizinrad',
                  'Naturzeremonien',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: '#e8ede7', color: '#4a6a4e' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quote */}
              <div
                className="rounded-xl p-6"
                style={{ background: '#f2f0ea', border: '1px solid #e5e3dc' }}
              >
                <div className="text-3xl mb-3">🪶</div>
                <blockquote
                  className="text-sm italic leading-relaxed mb-3"
                  style={{ color: '#4a4a42' }}
                >
                  „Omitakuyasin — Wir sind alle verbunden. Nicht als Idee. Als Tatsache."
                </blockquote>
                <p className="text-xs" style={{ color: '#8a8a7e' }}>
                  Lakota-Tradition
                </p>
              </div>

              {/* Cross-links */}
              <div
                className="rounded-xl p-6"
                style={{ background: '#f2f0ea', border: '1px solid #e5e3dc' }}
              >
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#1a1a18' }}>
                  Vernetzt denken
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#6a6a62' }}>
                  Deine Vision braucht Gleichgesinnte — und Gleichgesinnte brauchen einen Prozess.
                  Hier passt alles zusammen:
                </p>
                <div className="space-y-2">
                  <a
                    href="https://die-problemloeser.org"
                    className="flex items-center gap-2 text-xs p-2 rounded-lg hover:bg-white transition-colors"
                    style={{ color: '#3d6a40' }}
                  >
                    <span>🔗</span> Die Problemlöser e.V. — Community der Visionäre
                  </a>
                  <a
                    href="https://consent.adlix.de"
                    className="flex items-center gap-2 text-xs p-2 rounded-lg hover:bg-white transition-colors"
                    style={{ color: '#3d6a40' }}
                  >
                    <span>🔗</span> adlix consent — So entscheiden Kreise
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t" style={{ borderColor: '#e5e3dc', background: '#f2f0ea' }}>
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-2xl font-bold mb-10" style={{ color: '#1a1a18' }}>
            Häufige Fragen
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="rounded-xl group"
                style={{ background: '#faf9f5', border: '1px solid #e5e3dc' }}
              >
                <summary
                  className="px-6 py-4 cursor-pointer font-medium select-none flex items-center justify-between"
                  style={{ color: '#1a1a18' }}
                >
                  {q}
                  <span
                    className="text-sm transition-transform group-open:rotate-45"
                    style={{ color: '#8a8a7e' }}
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#5a5a52' }}>
                  {a}
                </div>
              </details>
            ))}
          </div>

          <div
            className="mt-10 p-6 rounded-xl text-center"
            style={{ background: '#e8ede7', border: '1px solid #c8d4c2' }}
          >
            <p className="text-sm mb-4" style={{ color: '#3a4a38' }}>
              Keine Antwort auf deine Frage dabei?
            </p>
            <a
              href="https://kit.com/matthias-zillig/erstgespraech"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: '#2d3a2e' }}
            >
              Kostenloses Erstgespräch →
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t" style={{ borderColor: '#e5e3dc' }}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🌿</span>
                <span className="font-semibold" style={{ color: '#2d3a2e' }}>
                  Elemental LifeCoach
                </span>
              </div>
              <p className="text-sm" style={{ color: '#6a6a62' }}>
                Ganzheitliche Begleitung bei Lebensübergängen. Elemente als Kompass. Vision als
                Ziel.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#1a1a18' }}>
                Navigation
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6a6a62' }}>
                <li>
                  <a href="#weg" className="hover:underline">
                    Der Weg
                  </a>
                </li>
                <li>
                  <a href="#angebote" className="hover:underline">
                    Angebote
                  </a>
                </li>
                <li>
                  <a href="#vision" className="hover:underline">
                    Visionssuche
                  </a>
                </li>
                <li>
                  <a href="#ueber" className="hover:underline">
                    Über mich
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#1a1a18' }}>
                Buchen
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6a6a62' }}>
                <li>
                  <a
                    href="https://kit.com/matthias-zillig/erstgespraech"
                    className="hover:underline"
                  >
                    Erstgespräch (kostenlos)
                  </a>
                </li>
                <li>
                  <a
                    href="https://kit.com/matthias-zillig/einzelsitzung"
                    className="hover:underline"
                  >
                    Einzelsitzung
                  </a>
                </li>
                <li>
                  <a
                    href="https://kit.com/matthias-zillig/visionssuche"
                    className="hover:underline"
                  >
                    Visionssuche (880 EUR)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: '#e5e3dc' }}
          >
            <p className="text-xs" style={{ color: '#8a8a7e' }}>
              © 2026 Matthias Zillig ·{' '}
              <a href="https://die-problemloeser.org" className="hover:underline">
                Die Problemlöser e.V.
              </a>
            </p>
            <p className="text-xs" style={{ color: '#8a8a7e' }}>
              <a href="/impressum" className="hover:underline">
                Impressum
              </a>{' '}
              ·{' '}
              <a href="/datenschutz" className="hover:underline">
                Datenschutz
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
