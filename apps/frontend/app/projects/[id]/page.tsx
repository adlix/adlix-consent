"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = "information" | "reaction" | "adjustment" | "voting" | "integration" | "completed";
type CommentType = "question" | "answer" | "reaction" | "perspective";
type VoteChoice = "consent" | "minor_objection" | "major_objection" | "abstain";

interface Comment {
  id: number;
  user: string;
  content: string;
  type: CommentType;
  createdAt: string;
}

interface VoteHistory {
  choice: VoteChoice;
  reason?: string;
  changedAt: string;
}

interface Vote {
  id: number;
  user: string;
  choice: VoteChoice;
  reason?: string;
  previousChoice?: VoteChoice;
  reasonForChange?: string;
  voteHistory?: VoteHistory[];
}

interface AuditEntry {
  id: number;
  action: string;
  details: string;
  userName?: string;
  createdAt: string;
}

interface Round {
  id: number;
  roundNumber: number;
  proposal: string;
  status: Phase;
  startDate: string;
  endDate?: string;
  votes: Vote[];
  comments: Comment[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockProject = {
  id: 1,
  name: "Neues Büro-Konzept",
  description: "Diskussion über flexible Arbeitsplatzgestaltung und Remote-Work-Policy",
  status: "active",
  owner: { name: "Matthias Zillig", email: "matthias@example.com" },
  participantCount: 5,
  participants: ["Matthias", "Anna", "Tom", "Lisa", "Max"],
};

const mockAuditLog: AuditEntry[] = [
  { id: 1, action: "create_project", details: "Vorhaben erstellt", userName: "Matthias", createdAt: "2026-04-10T09:00:00Z" },
  { id: 2, action: "start_round", details: "Runde 1 gestartet", userName: "Matthias", createdAt: "2026-04-10T09:05:00Z" },
  { id: 3, action: "phase_transition", details: "Phase wechselte von information zu reaction", userName: "Matthias", createdAt: "2026-04-11T14:00:00Z" },
  { id: 4, action: "submit_question", details: "Frage eingereicht: Gilt das für alle Standorte?", userName: "Anna", createdAt: "2026-04-10T10:30:00Z" },
  { id: 5, action: "submit_reaction", details: "Reaktion eingereicht", userName: "Tom", createdAt: "2026-04-11T15:00:00Z" },
  { id: 6, action: "phase_transition", details: "Phase wechselte von reaction zu voting", userName: "Matthias", createdAt: "2026-04-12T09:00:00Z" },
  { id: 7, action: "submit_vote", details: "Stimme: Konsent", userName: "Anna", createdAt: "2026-04-12T10:00:00Z" },
  { id: 8, action: "change_vote", details: "Stimme geändert: minor_objection → consent", userName: "Tom", createdAt: "2026-04-13T11:30:00Z" },
];

const mockRounds: Round[] = [
  {
    id: 1,
    roundNumber: 1,
    proposal: "Wir führen ein hybrides Arbeitsmodell ein: 2 Tage Büro, 3 Tage Remote.",
    status: "completed",
    startDate: "2026-04-10",
    endDate: "2026-04-14",
    votes: [
      { id: 1, user: "Matthias", choice: "consent", reason: "Passt gut zu unserem Teamrhythmus." },
      { id: 2, user: "Anna", choice: "minor_objection", reason: "Bitte Regelung für Elternteil-Zeiten klären." },
      { id: 3, user: "Tom", choice: "consent" },
      { id: 4, user: "Lisa", choice: "abstain", reason: "Bin kaum betroffen." },
      { id: 5, user: "Max", choice: "consent" },
    ],
    comments: [
      { id: 1, user: "Anna", content: "Gilt das für alle Standorte?", type: "question", createdAt: "2026-04-10T10:30:00Z" },
      { id: 2, user: "Matthias", content: "Ja, für alle deutschen Standorte.", type: "answer", createdAt: "2026-04-10T11:00:00Z" },
      { id: 3, user: "Tom", content: "Ich finde 3 Tage Remote ausreichend flexibel.", type: "reaction", createdAt: "2026-04-11T15:00:00Z" },
      { id: 4, user: "Lisa", content: "Ich bin wenig betroffen, klingt aber sinnvoll.", type: "reaction", createdAt: "2026-04-11T16:00:00Z" },
    ],
  },
  {
    id: 2,
    roundNumber: 2,
    proposal: "Angepasstes Modell: Flex-Tage nach Absprache mit Team, Core-Days Di+Do im Büro.",
    status: "voting",
    startDate: "2026-04-15",
    votes: [
      {
        id: 6,
        user: "Matthias",
        choice: "consent",
        reason: "Die Anpassung hat meine Bedenken adressiert.",
        previousChoice: "minor_objection",
        reasonForChange: "Nach der Reaktionsrunde sehe ich, dass Core-Days ausreichen.",
        voteHistory: [
          { choice: "minor_objection", reason: "Core-Days sollten flexibler sein.", changedAt: "2026-04-15T10:00:00Z" },
        ],
      },
      { id: 7, user: "Anna", choice: "consent" },
    ],
    comments: [
      { id: 5, user: "Lisa", content: "Was passiert wenn jemand an einem Core-Day krank ist?", type: "question", createdAt: "2026-04-15T09:00:00Z" },
      { id: 6, user: "Max", content: "Ich finde Core-Days eine gute Lösung für Teamkohäsion.", type: "perspective", createdAt: "2026-04-15T10:00:00Z" },
    ],
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const PHASE_ORDER: Phase[] = ["information", "reaction", "adjustment", "voting", "integration", "completed"];

const PHASE_LABELS: Record<Phase, string> = {
  information: "Informationsrunde",
  reaction: "Reaktionsrunde",
  adjustment: "Anpassung",
  voting: "Abstimmungsrunde",
  integration: "Integration",
  completed: "Abgeschlossen",
};

const PHASE_ICONS: Record<Phase, string> = {
  information: "❓",
  reaction: "💬",
  adjustment: "🔄",
  voting: "🗳️",
  integration: "🔧",
  completed: "✅",
};

const VOTE_CONFIG: Record<VoteChoice, { label: string; emoji: string; color: string; activeColor: string }> = {
  consent: { label: "Konsent", emoji: "✅", color: "bg-green-50 text-green-700 hover:bg-green-100", activeColor: "bg-success text-white ring-4 ring-success/20" },
  minor_objection: { label: "Leichter Einwand", emoji: "💛", color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100", activeColor: "bg-warning text-white ring-4 ring-warning/20" },
  major_objection: { label: "Schwerwiegender Einwand", emoji: "🔴", color: "bg-red-50 text-red-700 hover:bg-red-100", activeColor: "bg-danger text-white ring-4 ring-danger/20" },
  abstain: { label: "Enthalten", emoji: "⏸️", color: "bg-gray-100 text-gray-700 hover:bg-gray-200", activeColor: "bg-gray-500 text-white ring-4 ring-gray-500/20" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PhaseHint({ phase }: { phase: Phase }) {
  const hints: Partial<Record<Phase, { text: string; color: string }>> = {
    information: { text: "Informationsrunde — nur Fragen, keine Meinungen", color: "bg-blue-50 border-blue-200 text-blue-800" },
    reaction: { text: "Reaktionsrunde — nur Perspektiven, kein Gegenargumentieren", color: "bg-purple-50 border-purple-200 text-purple-800" },
    adjustment: { text: "Anpassungsphase — der Einreicher kann das Vorhaben überarbeiten", color: "bg-orange-50 border-orange-200 text-orange-800" },
    voting: { text: "Abstimmungsrunde — wähle deine Haltung zum Vorhaben", color: "bg-green-50 border-green-200 text-green-800" },
    integration: { text: "Integrationsphase — schwerwiegende Einwände werden eingearbeitet", color: "bg-red-50 border-red-200 text-red-800" },
  };

  const hint = hints[phase];
  if (!hint) return null;

  return (
    <div className={`p-3 rounded-lg border text-sm font-medium ${hint.color} mb-4`}>
      ℹ️ {hint.text}
    </div>
  );
}

function VoteBadge({ choice }: { choice: VoteChoice }) {
  const cfg = VOTE_CONFIG[choice];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${cfg.color}`}>
      {cfg.emoji} {cfg.label}
    </span>
  );
}

function InformationRound({
  round,
  currentUser,
}: {
  round: Round;
  currentUser: string;
}) {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const questions = round.comments.filter((c) => c.type === "question");
  const answers = round.comments.filter((c) => c.type === "answer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.includes("?")) {
      setError("Deine Eingabe muss eine Frage sein (mit Fragezeichen ?).");
      return;
    }
    setError("");
    setSubmitted(true);
    setQuestion("");
  };

  return (
    <div className="space-y-6">
      {/* Question form */}
      {round.status === "information" && !submitted && (
        <form onSubmit={handleSubmit} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-2 text-blue-900">Frage stellen</h4>
          <textarea
            value={question}
            onChange={(e) => { setQuestion(e.target.value); setError(""); }}
            className="w-full p-3 border border-blue-200 rounded-lg mb-2 bg-white"
            rows={3}
            placeholder="Deine Verständnisfrage (muss ein Fragezeichen ? enthalten)..."
            required
          />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
          >
            Frage einreichen
          </button>
        </form>
      )}
      {submitted && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          ✅ Deine Frage wurde eingereicht.
        </div>
      )}

      {/* Q&A list */}
      {questions.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3">Fragen & Antworten</h4>
          <div className="space-y-3">
            {questions.map((q) => {
              const answer = answers.find((a) => a.id === q.id + 1);
              return (
                <div key={q.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-blue-50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium bg-blue-200 text-blue-800 px-2 py-0.5 rounded">Frage</span>
                      <span className="font-medium text-sm">{q.user}</span>
                      <span className="text-xs text-gray-500 ml-auto">{new Date(q.createdAt).toLocaleDateString("de")}</span>
                    </div>
                    <p className="text-gray-900">{q.content}</p>
                  </div>
                  {answer && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Antwort</span>
                        <span className="font-medium text-sm">{answer.user}</span>
                        <span className="text-xs text-gray-500 ml-auto">{new Date(answer.createdAt).toLocaleDateString("de")}</span>
                      </div>
                      <p className="text-gray-900">{answer.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ReactionRound({
  round,
  participants,
}: {
  round: Round;
  participants: string[];
}) {
  const [perspective, setPerspective] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reactions = round.comments.filter((c) => c.type === "reaction" || c.type === "perspective");
  const reactedUsers = new Set(reactions.map((r) => r.user));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setPerspective("");
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      {round.status === "reaction" && !submitted && (
        <form onSubmit={handleSubmit} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="font-medium mb-2 text-purple-900">Deine Perspektive</h4>
          <textarea
            value={perspective}
            onChange={(e) => setPerspective(e.target.value)}
            className="w-full p-3 border border-purple-200 rounded-lg mb-2 bg-white"
            rows={3}
            placeholder="Deine kurze Perspektive zum Vorhaben..."
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
          >
            Perspektive einreichen
          </button>
        </form>
      )}
      {submitted && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          ✅ Deine Perspektive wurde eingereicht.
        </div>
      )}

      {/* Participation tracker */}
      <div>
        <h4 className="font-semibold mb-3">Teilnahme-Übersicht</h4>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                reactedUsers.has(p)
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {reactedUsers.has(p) ? "✓ " : "○ "}{p}
            </span>
          ))}
        </div>
      </div>

      {/* Reactions in order */}
      {reactions.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3">Perspektiven (reihum)</h4>
          <div className="space-y-3">
            {reactions.map((r, idx) => (
              <div key={r.id} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{r.user}</span>
                  <span className="text-xs text-gray-500 ml-auto">{new Date(r.createdAt).toLocaleDateString("de")}</span>
                </div>
                <p className="text-gray-900 pl-8">{r.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VotingRound({
  round,
  currentUser,
}: {
  round: Round;
  currentUser: string;
}) {
  const existingVote = round.votes.find((v) => v.user === currentUser);
  const [userChoice, setUserChoice] = useState<VoteChoice | null>(existingVote?.choice ?? null);
  const [reason, setReason] = useState(existingVote?.reason ?? "");
  const [isChanging, setIsChanging] = useState(false);
  const [changeReason, setChangeReason] = useState("");
  const [submitted, setSubmitted] = useState(!!existingVote);

  const voteCount: Record<VoteChoice, number> = { consent: 0, minor_objection: 0, major_objection: 0, abstain: 0 };
  round.votes.forEach((v) => voteCount[v.choice]++);
  const totalVoted = round.votes.length;

  const handleVote = (choice: VoteChoice) => {
    if (!submitted) setUserChoice(choice);
  };

  const handleSubmitVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChoice) return;
    setSubmitted(true);
    setIsChanging(false);
  };

  const handleChangeVote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setIsChanging(false);
  };

  return (
    <div className="space-y-6">
      {/* Sense Check notice */}
      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-800">
        <strong>2-Stufen-Voting:</strong> Die Reaktionsrunde diente als Sense Check. Jetzt folgt der formelle Consent-Vote.
      </div>

      {/* Vote buttons */}
      {!submitted && (
        <form onSubmit={handleSubmitVote}>
          <h4 className="font-semibold mb-3">Deine Stimme</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {(Object.keys(VOTE_CONFIG) as VoteChoice[]).map((choice) => {
              const cfg = VOTE_CONFIG[choice];
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handleVote(choice)}
                  className={`py-4 px-4 rounded-xl font-medium transition-all text-left ${
                    userChoice === choice ? cfg.activeColor : cfg.color
                  }`}
                >
                  <div className="text-2xl mb-1">{cfg.emoji}</div>
                  <div className="text-sm font-semibold">{cfg.label}</div>
                </button>
              );
            })}
          </div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3"
            rows={2}
            placeholder="Begründung (optional)..."
          />
          <button
            type="submit"
            disabled={!userChoice}
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Abstimmen
          </button>
        </form>
      )}

      {/* Submitted — show existing vote + change option */}
      {submitted && existingVote && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Deine aktuelle Stimme:</span>
            <VoteBadge choice={existingVote.choice} />
          </div>
          {existingVote.reason && <p className="text-sm text-gray-600 mb-2">"{existingVote.reason}"</p>}
          {existingVote.previousChoice && (
            <p className="text-xs text-gray-500 mb-2">
              Geändert von <VoteBadge choice={existingVote.previousChoice} /> — "{existingVote.reasonForChange}"
            </p>
          )}
          {!isChanging && (
            <button
              onClick={() => setIsChanging(true)}
              className="text-sm text-primary underline hover:no-underline"
            >
              Stimme ändern
            </button>
          )}
          {isChanging && (
            <form onSubmit={handleChangeVote} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(VOTE_CONFIG) as VoteChoice[]).map((choice) => {
                  const cfg = VOTE_CONFIG[choice];
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => setUserChoice(choice)}
                      className={`py-3 px-3 rounded-xl font-medium transition-all text-left text-sm ${
                        userChoice === choice ? cfg.activeColor : cfg.color
                      }`}
                    >
                      {cfg.emoji} {cfg.label}
                    </button>
                  );
                })}
              </div>
              <textarea
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={2}
                placeholder="Grund für die Änderung..."
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                  Änderung speichern
                </button>
                <button type="button" onClick={() => setIsChanging(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium">
                  Abbrechen
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Vote results */}
      <div>
        <h4 className="font-semibold mb-3">Abstimmungsstand ({totalVoted} Stimmen)</h4>
        <div className="space-y-2">
          {(Object.keys(VOTE_CONFIG) as VoteChoice[]).map((choice) => {
            const cfg = VOTE_CONFIG[choice];
            const count = voteCount[choice];
            const pct = totalVoted > 0 ? Math.round((count / totalVoted) * 100) : 0;
            return (
              <div key={choice} className="flex items-center gap-3">
                <span className="w-32 text-sm shrink-0">{cfg.emoji} {cfg.label}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual votes */}
      {round.votes.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3">Stimmen im Detail</h4>
          <div className="space-y-2">
            {round.votes.map((v) => (
              <div key={v.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{v.user}</span>
                    <VoteBadge choice={v.choice} />
                    {v.previousChoice && (
                      <span className="text-xs text-gray-400">(geändert)</span>
                    )}
                  </div>
                  {v.reason && <p className="text-sm text-gray-600">"{v.reason}"</p>}
                  {v.voteHistory && v.voteHistory.length > 0 && (
                    <details className="mt-1">
                      <summary className="text-xs text-gray-400 cursor-pointer">Verlauf anzeigen</summary>
                      <div className="mt-1 pl-3 border-l-2 border-gray-200 space-y-1">
                        {v.voteHistory.map((h, i) => (
                          <div key={i} className="text-xs text-gray-500">
                            {new Date(h.changedAt).toLocaleString("de")}: <VoteBadge choice={h.choice} /> {h.reason && `— "${h.reason}"`}
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AuditTrail({ entries }: { entries: AuditEntry[] }) {
  const actionLabels: Record<string, string> = {
    create_project: "Vorhaben erstellt",
    start_round: "Runde gestartet",
    phase_transition: "Phasenwechsel",
    submit_question: "Frage eingereicht",
    submit_answer: "Antwort eingereicht",
    submit_reaction: "Reaktion eingereicht",
    submit_vote: "Abgestimmt",
    change_vote: "Stimme geändert",
    submit_objection: "Einwand erhoben",
    adjust_proposal: "Vorschlag angepasst",
    complete_round: "Runde abgeschlossen",
  };

  const actionColors: Record<string, string> = {
    create_project: "bg-blue-100 text-blue-700",
    start_round: "bg-indigo-100 text-indigo-700",
    phase_transition: "bg-purple-100 text-purple-700",
    submit_question: "bg-cyan-100 text-cyan-700",
    submit_answer: "bg-teal-100 text-teal-700",
    submit_reaction: "bg-violet-100 text-violet-700",
    submit_vote: "bg-green-100 text-green-700",
    change_vote: "bg-yellow-100 text-yellow-700",
    submit_objection: "bg-red-100 text-red-700",
    adjust_proposal: "bg-orange-100 text-orange-700",
    complete_round: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="shrink-0 mt-0.5">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${actionColors[entry.action] ?? "bg-gray-100 text-gray-700"}`}>
              {actionLabels[entry.action] ?? entry.action}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">{entry.details}</p>
            {entry.userName && <p className="text-xs text-gray-500">{entry.userName}</p>}
          </div>
          <div className="shrink-0 text-xs text-gray-400 whitespace-nowrap">
            {new Date(entry.createdAt).toLocaleString("de", { dateStyle: "short", timeStyle: "short" })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const [selectedRound, setSelectedRound] = useState<Round>(mockRounds[mockRounds.length - 1]);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const currentUser = "Matthias";

  const getCurrentPhaseIndex = () => PHASE_ORDER.indexOf(selectedRound.status);

  const getStatusLabel = (phase: Phase) => PHASE_LABELS[phase] ?? phase;

  const getStatusBadgeColor = (phase: Phase) => {
    switch (phase) {
      case "information": return "bg-blue-100 text-blue-700";
      case "reaction": return "bg-purple-100 text-purple-700";
      case "adjustment": return "bg-orange-100 text-orange-700";
      case "voting": return "bg-primary text-white";
      case "integration": return "bg-red-100 text-red-700";
      case "completed": return "bg-success text-white";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <span className="text-2xl">🗳️</span>
            <span className="text-xl font-bold">adlix consent</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              ← Projekte
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Project header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mockProject.name}</h1>
                <p className="text-gray-600">{mockProject.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 shrink-0">
                Aktiv
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Erstellt von: {mockProject.owner.name}</span>
              <span>{mockProject.participantCount} Teilnehmer</span>
              <span>{mockRounds.length} Runden</span>
            </div>
          </div>

          {/* Consent flow progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Consent-Prozess</h2>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {PHASE_ORDER.map((phase, index) => {
                const currentIndex = getCurrentPhaseIndex();
                const isCompleted = index < currentIndex;
                const isActive = index === currentIndex;

                return (
                  <div key={phase} className="flex items-center min-w-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 shrink-0 transition-colors ${
                          isCompleted
                            ? "bg-success text-white"
                            : isActive
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {PHASE_ICONS[phase]}
                      </div>
                      <div className={`text-xs font-medium text-center max-w-[64px] ${isActive ? "text-primary" : "text-gray-500"}`}>
                        {PHASE_LABELS[phase]}
                      </div>
                    </div>
                    {index < PHASE_ORDER.length - 1 && (
                      <div
                        className={`w-6 sm:w-10 h-0.5 mx-1 sm:mx-2 shrink-0 transition-colors ${
                          isCompleted ? "bg-success" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Round selector */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Runden</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {mockRounds.map((round) => (
                <button
                  key={round.id}
                  onClick={() => setSelectedRound(round)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedRound.id === round.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Runde {round.roundNumber}
                  {round.status === "voting" && " 🗳️"}
                  {round.status === "information" && " ❓"}
                  {round.status === "reaction" && " 💬"}
                  {round.status === "completed" && " ✓"}
                </button>
              ))}
            </div>
          </div>

          {/* Selected round detail */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Runde {selectedRound.roundNumber}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedRound.status)}`}>
                {getStatusLabel(selectedRound.status)}
              </span>
            </div>

            {/* Proposal */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Vorschlag</h3>
              <p className="text-gray-900">{selectedRound.proposal}</p>
            </div>

            {/* Phase hint */}
            <PhaseHint phase={selectedRound.status} />

            {/* Phase-specific content */}
            {selectedRound.status === "information" && (
              <InformationRound round={selectedRound} currentUser={currentUser} />
            )}
            {selectedRound.status === "reaction" && (
              <ReactionRound round={selectedRound} participants={mockProject.participants} />
            )}
            {selectedRound.status === "voting" && (
              <VotingRound round={selectedRound} currentUser={currentUser} />
            )}
            {selectedRound.status === "completed" && (
              <div className="space-y-6">
                {/* Summary of completed round */}
                {selectedRound.votes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Abstimmungsergebnis</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(Object.keys(VOTE_CONFIG) as VoteChoice[]).map((choice) => {
                        const cfg = VOTE_CONFIG[choice];
                        const count = selectedRound.votes.filter((v) => v.choice === choice).length;
                        return (
                          <div key={choice} className="p-3 bg-gray-50 rounded-lg text-center">
                            <div className="text-2xl mb-1">{cfg.emoji}</div>
                            <div className="text-2xl font-bold">{count}</div>
                            <div className="text-xs text-gray-500">{cfg.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* All comments from the round */}
                {selectedRound.comments.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Dokumentation der Runde</h4>
                    <div className="space-y-3">
                      {selectedRound.comments.map((c) => (
                        <div key={c.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded capitalize">{c.type}</span>
                            <span className="font-medium text-sm">{c.user}</span>
                            <span className="text-xs text-gray-500 ml-auto">{new Date(c.createdAt).toLocaleDateString("de")}</span>
                          </div>
                          <p className="text-gray-700">{c.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Audit trail */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Audit-Trail</h2>
              <button
                onClick={() => setShowAuditLog(!showAuditLog)}
                className="text-sm text-primary hover:underline"
              >
                {showAuditLog ? "Ausblenden" : "Anzeigen"}
              </button>
            </div>
            {showAuditLog && <AuditTrail entries={mockAuditLog} />}
            {!showAuditLog && (
              <p className="text-sm text-gray-500">
                {mockAuditLog.length} Aktionen protokolliert — vollständiger Zeitstempel-Verlauf aller Schritte.
              </p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
