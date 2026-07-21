'use client'

import { useState, useMemo } from 'react'

/**
 * TeamCalculator — Interaktiver Team-Größen-Rechner für die Landing Page
 *
 * Zeigt wie viele Consent-Loops pro Monat ein Team realistisch braucht,
 * und was das im Vergleich zu klassischen Meetings bedeutet.
 */

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

export default function TeamCalculator() {
  const [teamSize, setTeamSize] = useState(8)
  const [decisionsPerMonth, setDecisionsPerMonth] = useState(6)
  const [meetingLengthMin, setMeetingLengthMin] = useState(60)

  // Hourly cost per person (rough European average knowledge worker)
  const hourlyRate = 65

  const classic = useMemo(() => {
    // Classic: all people in every meeting, full meeting length
    const totalHours = (teamSize * decisionsPerMonth * meetingLengthMin) / 60
    const cost = totalHours * hourlyRate
    const implementRate = 0.34 // 34% completion rate from research
    const doneDecisions = Math.round(decisionsPerMonth * implementRate)
    return { totalHours, cost, doneDecisions }
  }, [teamSize, decisionsPerMonth, meetingLengthMin])

  const consent = useMemo(() => {
    // Consent: ~40–70% less meeting time, async rounds possible
    const roundsPerDecision = 1.4 // avg rounds needed
    // Async info + reaction rounds save time vs. synchronous meetings
    const asyncFactor = 0.45 // ~45% of time is async
    const syncMeetingMin = meetingLengthMin * (1 - asyncFactor) * roundsPerDecision
    const totalHours = (teamSize * decisionsPerMonth * syncMeetingMin) / 60
    const cost = totalHours * hourlyRate
    const implementRate = 0.82 // Consent: ~82% completion rate (people own their decisions)
    const doneDecisions = Math.round(decisionsPerMonth * implementRate)
    return { totalHours, cost, doneDecisions, syncMeetingMin }
  }, [teamSize, decisionsPerMonth, meetingLengthMin])

  const savings = {
    hours: Math.max(0, classic.totalHours - consent.totalHours),
    cost: Math.max(0, classic.cost - consent.cost),
    extraDecisions: Math.max(0, consent.doneDecisions - classic.doneDecisions),
  }

  const savingsPct = classic.cost > 0 ? Math.round((savings.cost / classic.cost) * 100) : 0

  return (
    <section
      className="py-20 bg-gradient-to-b from-slate-50 to-white border-t border-gray-100"
      aria-labelledby="calculator-heading"
      id="calculator"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium mb-6">
            <span aria-hidden="true">🧮</span> Dein Team — konkret
          </div>
          <h2 id="calculator-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Was kostet euch Entscheidungsarbeit?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Stell dein Team ein — sieh den Unterschied zwischen klassischen Meetings und
            Consent-Loops in echten Zahlen.
          </p>
        </div>

        {/* Sliders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team size */}
            <div>
              <label htmlFor="team-size" className="block text-sm font-semibold text-gray-700 mb-2">
                Team-Größe
                <span className="ml-2 text-2xl font-bold text-violet-600">{teamSize}</span>
                <span className="text-gray-400 text-xs ml-1">Personen</span>
              </label>
              <input
                id="team-size"
                type="range"
                min={3}
                max={30}
                step={1}
                value={teamSize}
                onChange={(e) => setTeamSize(clamp(Number(e.target.value), 3, 30))}
                className="w-full h-2 bg-violet-100 rounded-full appearance-none cursor-pointer accent-violet-600"
                aria-valuenow={teamSize}
                aria-valuemin={3}
                aria-valuemax={30}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3</span>
                <span>30</span>
              </div>
            </div>

            {/* Decisions per month */}
            <div>
              <label
                htmlFor="decisions-month"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Entscheidungen/Monat
                <span className="ml-2 text-2xl font-bold text-violet-600">{decisionsPerMonth}</span>
                <span className="text-gray-400 text-xs ml-1">Stück</span>
              </label>
              <input
                id="decisions-month"
                type="range"
                min={1}
                max={20}
                step={1}
                value={decisionsPerMonth}
                onChange={(e) => setDecisionsPerMonth(clamp(Number(e.target.value), 1, 20))}
                className="w-full h-2 bg-violet-100 rounded-full appearance-none cursor-pointer accent-violet-600"
                aria-valuenow={decisionsPerMonth}
                aria-valuemin={1}
                aria-valuemax={20}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            {/* Meeting length */}
            <div>
              <label
                htmlFor="meeting-length"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Ø Meeting-Dauer
                <span className="ml-2 text-2xl font-bold text-violet-600">{meetingLengthMin}</span>
                <span className="text-gray-400 text-xs ml-1">Min</span>
              </label>
              <input
                id="meeting-length"
                type="range"
                min={30}
                max={180}
                step={15}
                value={meetingLengthMin}
                onChange={(e) => setMeetingLengthMin(clamp(Number(e.target.value), 30, 180))}
                className="w-full h-2 bg-violet-100 rounded-full appearance-none cursor-pointer accent-violet-600"
                aria-valuenow={meetingLengthMin}
                aria-valuemin={30}
                aria-valuemax={180}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>30 Min</span>
                <span>3 Std</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Classic */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">
                😮‍💨
              </span>
              <h3 className="text-lg font-bold text-red-800">Klassische Meetings</h3>
            </div>
            <ul className="space-y-3 list-none">
              <li className="flex justify-between items-baseline">
                <span className="text-sm text-red-700">Meeting-Stunden/Monat</span>
                <span className="text-xl font-bold text-red-800">
                  {classic.totalHours.toFixed(0)}h
                </span>
              </li>
              <li className="flex justify-between items-baseline">
                <span className="text-sm text-red-700">Personalkosten/Monat</span>
                <span className="text-xl font-bold text-red-800">
                  {classic.cost.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  })}
                </span>
              </li>
              <li className="flex justify-between items-baseline">
                <span className="text-sm text-red-700">Wirklich umgesetzt</span>
                <span className="text-xl font-bold text-red-800">
                  {classic.doneDecisions}/{decisionsPerMonth}
                </span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-red-500">
              ∅ 34 % Umsetzungsrate — weil Betroffene nicht Beteiligte sind.
            </p>
          </div>

          {/* Consent */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">
                🌱
              </span>
              <h3 className="text-lg font-bold text-emerald-800">Consent-Loops</h3>
            </div>
            <ul className="space-y-3 list-none">
              <li className="flex justify-between items-baseline">
                <span className="text-sm text-emerald-700">Sync-Stunden/Monat</span>
                <span className="text-xl font-bold text-emerald-800">
                  {consent.totalHours.toFixed(0)}h
                </span>
              </li>
              <li className="flex justify-between items-baseline">
                <span className="text-sm text-emerald-700">Personalkosten/Monat</span>
                <span className="text-xl font-bold text-emerald-800">
                  {consent.cost.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  })}
                </span>
              </li>
              <li className="flex justify-between items-baseline">
                <span className="text-sm text-emerald-700">Wirklich umgesetzt</span>
                <span className="text-xl font-bold text-emerald-800">
                  {consent.doneDecisions}/{decisionsPerMonth}
                </span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-emerald-600">
              ∅ 82 % Umsetzungsrate — Consent schafft Ownership.
            </p>
          </div>
        </div>

        {/* Savings Banner */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white text-center shadow-lg">
          <p className="text-sm font-medium opacity-80 mb-2 uppercase tracking-wide">
            Euer Einsparungspotenzial pro Monat
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-4">
            <div>
              <div className="text-4xl font-extrabold">
                {savings.cost.toLocaleString('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-sm opacity-75">Personalkosten ({savingsPct}% weniger)</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold">{savings.hours.toFixed(0)}h</div>
              <div className="text-sm opacity-75">Sync-Zeit zurückgewonnen</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold">+{savings.extraDecisions}</div>
              <div className="text-sm opacity-75">mehr umgesetzte Entscheidungen</div>
            </div>
          </div>
          <p className="text-xs opacity-60 max-w-lg mx-auto">
            Schätzung basierend auf ∅ 65 €/Std. Personalkosten, Forschungsdaten zu Konsent-Teams und
            interner async-Anteil von ~45 %. Individuelle Ergebnisse variieren.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors text-lg shadow-md"
          >
            <span aria-hidden="true">🗳️</span>
            Jetzt kostenlos starten
          </a>
          <p className="text-sm text-gray-400 mt-3">
            Keine Kreditkarte · Erster Kreis in 5 Minuten
          </p>
        </div>
      </div>
    </section>
  )
}
