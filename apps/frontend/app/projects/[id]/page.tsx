"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data
const mockProject = {
  id: 1,
  name: "Neues Büro-Konzept",
  description: "Diskussion über flexible Arbeitsplatzgestaltung und Remote-Work-Policy",
  status: "active",
  owner: { name: "Matthias Zillig", email: "matthias@example.com" },
  participantCount: 12,
};

const mockRounds = [
  {
    id: 1,
    roundNumber: 1,
    proposal: "Wir führen ein hybrides Arbeitsmodell ein: 2 Tage Büro, 3 Tage Remote.",
    status: "completed",
    startDate: "2026-04-10",
    endDate: "2026-04-14",
    votes: { yes: 8, no: 2, abstain: 2 },
    objections: [],
    comments: [
      { id: 1, user: "Anna", content: "Könnte man nicht auch 3 Tage Büro anbieten?", createdAt: "2026-04-11" },
      { id: 2, user: "Tom", content: "Ich hätte gerne mehr Flexibilität.", createdAt: "2026-04-12" },
    ],
  },
  {
    id: 2,
    roundNumber: 2,
    proposal: "Angepasstes Modell: 3 Tage Büro, 2 Tage Remote, mit Core-Days (Di+Do).",
    status: "voting",
    startDate: "2026-04-15",
    endDate: "2026-04-19",
    votes: { yes: 5, no: 1, abstain: 0, total: 12 },
    objections: [
      { id: 1, user: "Lisa", severity: "minor", reason: "Core-Days sollten frei wählbar sein", status: "open" },
    ],
    comments: [
      { id: 3, user: "Lisa", content: "Bin grundsätzlich einverstanden, aber...", createdAt: "2026-04-15" },
      { id: 4, user: "Max", content: "Die Core-Days finde ich gut!", createdAt: "2026-04-16" },
    ],
  },
];

type VoteChoice = "yes" | "no" | "abstain";

// Consent Flow Steps
const flowSteps = [
  { label: "Beschreibung", icon: "📝" },
  { label: "Abstimmung", icon: "🗳️" },
  { label: "Einspruch", icon: "✋" },
  { label: "Diskussion", icon: "💬" },
  { label: "Anpassung", icon: "🔄" },
  { label: "Ergebnis", icon: "✅" },
];

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [selectedRound, setSelectedRound] = useState(mockRounds[mockRounds.length - 1]);
  const [userVote, setUserVote] = useState<VoteChoice | null>(null);
  const [showObjectionForm, setShowObjectionForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  const [objection, setObjection] = useState({ reason: "", severity: "minor" as const });

  const handleVote = (choice: VoteChoice) => {
    setUserVote(choice);
    // Here we would send the vote to the API
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would send the comment to the API
    setComment("");
    setShowCommentForm(false);
  };

  const handleSubmitObjection = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would send the objection to the API
    setObjection({ reason: "", severity: "minor" });
    setShowObjectionForm(false);
  };

  const getCurrentStepIndex = () => {
    switch (selectedRound.status) {
      case "open": return 0;
      case "voting": return 1;
      case "objection": return 2;
      case "discussion": return 3;
      case "completed": return 5;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">🗳️</span>
              <span className="text-xl font-bold">adlix consent</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              ← Projekte
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Project Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mockProject.name}</h1>
                <p className="text-gray-600">{mockProject.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Aktiv
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Erstellt von: {mockProject.owner.name}</span>
              <span>{mockProject.participantCount} Teilnehmer</span>
              <span>{mockRounds.length} Runden</span>
            </div>
          </div>

          {/* Consent Flow Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Consent-Prozess</h2>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {flowSteps.map((step, index) => {
                const currentIndex = getCurrentStepIndex();
                const isCompleted = index < currentIndex;
                const isActive = index === currentIndex;
                
                return (
                  <div key={index} className="flex items-center min-w-0">
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
                        {step.icon}
                      </div>
                      <div className={`text-xs font-medium text-center ${isActive ? "text-primary" : ""}`}>
                        {step.label}
                      </div>
                    </div>
                    {index < flowSteps.length - 1 && (
                      <div
                        className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 shrink-0 transition-colors ${
                          isCompleted ? "bg-success" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Round Selector */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Abstimmungsrunden</h2>
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
                  {round.status === "completed" && " ✓"}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Round */}
          {selectedRound && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Runde {selectedRound.roundNumber}
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedRound.status === "voting"
                    ? "bg-primary text-white"
                    : selectedRound.status === "completed"
                    ? "bg-success text-white"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {selectedRound.status === "voting" ? "Abstimmung läuft" :
                   selectedRound.status === "completed" ? "Abgeschlossen" :
                   selectedRound.status}
                </span>
              </div>

              {/* Proposal */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Vorschlag</h3>
                <p className="text-gray-900">{selectedRound.proposal}</p>
              </div>

              {/* Voting Section */}
              {selectedRound.status === "voting" && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Abstimmung</h3>
                  
                  {/* Vote Buttons */}
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => handleVote("yes")}
                      className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all ${
                        userVote === "yes"
                          ? "bg-success text-white ring-4 ring-success/20"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      <div className="text-2xl mb-1">👍</div>
                      <div>Zustimmen</div>
                    </button>
                    <button
                      onClick={() => handleVote("no")}
                      className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all ${
                        userVote === "no"
                          ? "bg-danger text-white ring-4 ring-danger/20"
                          : "bg-red-50 text-red-700 hover:bg-red-100"
                      }`}
                    >
                      <div className="text-2xl mb-1">👎</div>
                      <div>Ablehnen</div>
                    </button>
                    <button
                      onClick={() => handleVote("abstain")}
                      className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all ${
                        userVote === "abstain"
                          ? "bg-gray-500 text-white ring-4 ring-gray-500/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-2xl mb-1">➖</div>
                      <div>Enthalten</div>
                    </button>
                  </div>

                  {/* Vote Progress */}
                  {selectedRound.votes.total && (
                    <div className="text-sm text-gray-500 text-center">
                      {selectedRound.votes.yes + selectedRound.votes.no + selectedRound.votes.abstain} / {selectedRound.votes.total} Stimmen abgegeben
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setShowObjectionForm(!showObjectionForm)}
                      className="flex-1 py-3 px-4 rounded-lg font-medium border-2 border-warning text-warning hover:bg-warning/10 transition-colors"
                    >
                      ✋ Einspruch erheben
                    </button>
                    <button
                      onClick={() => setShowCommentForm(!showCommentForm)}
                      className="flex-1 py-3 px-4 rounded-lg font-medium border-2 border-primary text-primary hover:bg-primary/10 transition-colors"
                    >
                      💬 Kommentieren
                    </button>
                  </div>

                  {/* Objection Form */}
                  {showObjectionForm && (
                    <form onSubmit={handleSubmitObjection} className="mt-6 p-4 bg-warning/5 rounded-lg border border-warning/20">
                      <h4 className="font-medium mb-3">Einspruch erheben</h4>
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Begründung</label>
                        <textarea
                          value={objection.reason}
                          onChange={(e) => setObjection({ ...objection, reason: e.target.value })}
                          className="w-full p-3 border rounded-lg"
                          rows={3}
                          placeholder="Warum erhebst du Einspruch?"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Schweregrad</label>
                        <select
                          value={objection.severity}
                          onChange={(e) => setObjection({ ...objection, severity: e.target.value as "minor" | "major" | "blocking" })}
                          className="w-full p-3 border rounded-lg"
                        >
                          <option value="minor">Geringfügig</option>
                          <option value="major">Erheblich</option>
                          <option value="blocking">Blockierend</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-warning text-white rounded-lg font-medium hover:bg-warning/90"
                        >
                          Einspruch einreichen
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowObjectionForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Comment Form */}
                  {showCommentForm && (
                    <form onSubmit={handleSubmitComment} className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-3">Kommentar hinzufügen</h4>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-3"
                        rows={3}
                        placeholder="Dein Kommentar..."
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
                        >
                          Kommentieren
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCommentForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Objections */}
              {selectedRound.objections.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Einsprüche</h3>
                  <div className="space-y-3">
                    {selectedRound.objections.map((obj) => (
                      <div
                        key={obj.id}
                        className={`p-4 rounded-lg border ${
                          obj.severity === "blocking"
                            ? "bg-red-50 border-red-200"
                            : obj.severity === "major"
                            ? "bg-orange-50 border-orange-200"
                            : "bg-yellow-50 border-yellow-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{obj.user}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            obj.severity === "blocking"
                              ? "bg-red-200 text-red-800"
                              : obj.severity === "major"
                              ? "bg-orange-200 text-orange-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}>
                            {obj.severity === "blocking" ? "Blockierend" :
                             obj.severity === "major" ? "Erheblich" : "Geringfügig"}
                          </span>
                        </div>
                        <p className="text-gray-700">{obj.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              {selectedRound.comments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Diskussion</h3>
                  <div className="space-y-3">
                    {selectedRound.comments.map((cmt) => (
                      <div key={cmt.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{cmt.user}</span>
                          <span className="text-sm text-gray-500">{cmt.createdAt}</span>
                        </div>
                        <p className="text-gray-700">{cmt.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
