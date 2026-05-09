"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateProfileForm from "./CreateProfileForm";
import EditProfileForm from "./EditProfileForm";
import CreateCardForm from "./CreateCardForm";
import EditCardForm from "./EditCardForm";

// Реальные поля из schema.prisma
interface MentorProfile {
  id: string;
  userId: string;
  position: string;
  description: string;
  priceUsd: number | null;
  contactInfo: string | null;
  rating: number;
  sessionsCount: number;
  createdAt: Date;
  techStack: { id: string; mentorId: string; tech: string }[];
  serviceTypes: { id: string; mentorId: string; serviceType: string }[];
}

interface Card {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  format: string[];
  priceUsd: number | null;
  mentorId: string;
  createdAt: Date;
}

interface Session {
  id: string;
  status: string;
  createdAt: Date;
  student: { name: string | null; email: string };
  card: { title: string };
}

interface Props {
  profile: MentorProfile | null;
  cards: Card[];
  sessions: Session[];
  sessionsCount: number;
  rating: number;
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function MentorView({
  profile,
  cards,
  sessions,
  sessionsCount,
  rating,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"cards" | "sessions">("cards");
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [loadingSessionId, setLoadingSessionId] = useState<string | null>(null);

  function handleSuccess() {
    router.refresh();
  }

  async function patchSession(sessionId: string, status: string) {
    setLoadingSessionId(sessionId);
    try {
      const res = await fetch(`/api/mentor/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) router.refresh();
    } finally {
      setLoadingSessionId(null);
    }
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">Create your mentor profile</h2>
        <CreateProfileForm onSuccess={handleSuccess} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      {/* Profile summary */}
      <div className="bg-white rounded-xl shadow p-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">{profile.position}</h2>
          <p className="text-gray-500 text-sm mt-1">{profile.description}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>⭐ {rating > 0 ? rating.toFixed(1) : "No ratings yet"}</span>
            <span>✅ {sessionsCount} completed sessions</span>
            {profile.priceUsd && <span>${profile.priceUsd}/hr</span>}
          </div>
        </div>
        <EditProfileForm profile={profile} onSuccess={handleSuccess} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {(["cards", "sessions"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "cards"
              ? `My Cards (${cards.length})`
              : `Sessions (${sessions.length})`}
          </button>
        ))}
      </div>

      {/* Cards tab */}
      {activeTab === "cards" && (
        <div className="space-y-4">
          <CreateCardForm onSuccess={handleSuccess} />

          {cards.map((card) =>
            editingCardId === card.id ? (
              <EditCardForm
                key={card.id}
                card={card}
                onSuccess={() => {
                  setEditingCardId(null);
                  handleSuccess();
                }}
                onCancel={() => setEditingCardId(null)}
              />
            ) : (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow p-5 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {card.description}
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {card.techStack.map((t) => (
                      <span
                        key={t}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {card.format.map((f) => (
                      <span
                        key={f}
                        className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm mt-2 text-gray-600">
                    {card.priceUsd ? `$${card.priceUsd}` : "Free"}
                  </p>
                </div>
                <button
                  onClick={() => setEditingCardId(card.id)}
                  className="text-sm text-blue-600 hover:underline shrink-0 ml-4"
                >
                  Edit
                </button>
              </div>
            ),
          )}
        </div>
      )}

      {/* Sessions tab */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          {sessions.length === 0 && (
            <p className="text-gray-500 text-sm">No sessions yet.</p>
          )}
          {sessions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{s.card.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Student: {s.student.name ?? s.student.email}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
                <span
                  className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${
                    statusColor[s.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {s.status}
                </span>
              </div>

              {(s.status === "pending" || s.status === "confirmed") && (
                <div className="flex flex-col gap-2 ml-4 shrink-0">
                  <button
                    onClick={() => patchSession(s.id, "completed")}
                    disabled={loadingSessionId === s.id}
                    className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {loadingSessionId === s.id ? "..." : "Complete"}
                  </button>
                  <button
                    onClick={() => patchSession(s.id, "cancelled")}
                    disabled={loadingSessionId === s.id}
                    className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
