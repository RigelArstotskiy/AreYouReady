"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  rating: number;
  text: string;
}

interface Session {
  id: string;
  status: string;
  createdAt: Date;
  review: Review | null;
  card: {
    title: string;
    priceUsd: number | null;
    mentor: {
      name: string | null;
    };
  };
}

interface Props {
  sessions: Session[];
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabel: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-xl transition-colors ${
            star <= value ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-400`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!text.trim()) {
      setError("Please write a review");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, rating, text }),
    });

    setLoading(false);
    if (!res.ok) {
      setError("Failed to submit review");
      return;
    }
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-3 text-sm text-blue-600 hover:underline"
      >
        Leave a review →
      </button>
    );
  }

  return (
    <div className="mt-3 border-t pt-3 space-y-2">
      <StarRating value={rating} onChange={setRating} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
        className="w-full border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function SessionCard({ s }: { s: Session }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {s.card.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            with {s.card.mentor.name ?? "Mentor"}
          </p>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
            <span>{new Date(s.createdAt).toLocaleDateString("en-GB")}</span>
            {s.card.priceUsd && <span>· ${s.card.priceUsd}</span>}
          </div>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
            statusColor[s.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {statusLabel[s.status] ?? s.status}
        </span>
      </div>

      {s.status === "completed" &&
        (s.review ? (
          <div className="mt-3 border-t pt-3">
            <p className="text-xs text-gray-400 mb-1">Your review</p>
            <span className="text-sm">
              <span className="text-yellow-400">
                {"★".repeat(s.review.rating)}
              </span>
              <span className="text-gray-200">
                {"★".repeat(5 - s.review.rating)}
              </span>
            </span>
            <p className="text-sm text-gray-600 mt-1">{s.review.text}</p>
          </div>
        ) : (
          <ReviewForm sessionId={s.id} />
        ))}
    </div>
  );
}

export default function StudentView({ sessions }: Props) {
  const pending = sessions.filter((s) => s.status === "pending");
  const confirmed = sessions.filter((s) => s.status === "confirmed");
  const past = sessions.filter(
    (s) => s.status === "completed" || s.status === "cancelled",
  );

  if (sessions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center space-y-4">
        <p className="text-4xl">🎯</p>
        <h2 className="text-xl font-semibold text-gray-800">No sessions yet</h2>
        <p className="text-gray-500 text-sm">
          Book a mock interview with a mentor to get started
        </p>
        <Link
          href="/marketplace"
          className="inline-block mt-2 bg-blue-600 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          Browse mentors
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8 px-4">
      {pending.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Pending
          </h2>
          <div className="space-y-3">
            {pending.map((s) => (
              <SessionCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      {confirmed.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Confirmed
          </h2>
          <div className="space-y-3">
            {confirmed.map((s) => (
              <SessionCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Past Sessions
          </h2>
          <div className="space-y-3">
            {past.map((s) => (
              <SessionCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      <div className="pt-4 border-t text-center">
        <Link
          href="/marketplace"
          className="text-sm text-blue-600 hover:underline"
        >
          Book another session →
        </Link>
      </div>
    </div>
  );
}
