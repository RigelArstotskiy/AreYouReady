"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

interface MockupCard {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  format: string[];
  priceUsd: number | null;
  mentor: {
    id: string;
    name: string | null;
    image: string | null;
    mentorProfile: {
      contactInfo: string | null;
      rating: number;
      sessionsCount: number;
    } | null;
  };
}

const FORMAT_LABELS: Record<string, string> = {
  interview: "Интервью",
  codereview: "Код-ревью",
  cvreview: "CV ревью",
};

const LEVEL_OPTIONS = [
  { value: "junior", label: "Junior" },
  { value: "middle", label: "Middle" },
  { value: "senior", label: "Senior" },
];

export default function CardPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();

  const [card, setCard] = useState<MockupCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    studentLevel: "",
    goal: "",
    preferredTime: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/marketplace/cards/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCard(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.studentLevel || !form.goal) {
      setError("Заполните уровень и цель");
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/marketplace/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardId: id,
        studentLevel: form.studentLevel,
        goal: form.goal,
        preferredTime: form.preferredTime || null,
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError("Ошибка при отправке заявки");
      return;
    }

    setSuccess(true);
    setShowForm(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Загрузка...
      </div>
    );

  if (!card)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Карточка не найдена
      </div>
    );

  const isOwnCard = session?.user?.id === card.mentor.id;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{card.title}</h1>

      <p className="text-gray-600">{card.description}</p>

      <div className="flex flex-wrap gap-1">
        {card.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1">
        {card.format.map((f) => (
          <span
            key={f}
            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
          >
            {FORMAT_LABELS[f] ?? f}
          </span>
        ))}
      </div>

      <p className="text-lg font-semibold">
        {card.priceUsd ? `$${card.priceUsd}` : "Бесплатно"}
      </p>

      <div className="border rounded-lg p-4 flex flex-col gap-1">
        <p className="font-medium">{card.mentor.name ?? "Ментор"}</p>
        <p className="text-sm text-gray-500">
          Рейтинг: {card.mentor.mentorProfile?.rating ?? 0}
        </p>
        <p className="text-sm text-gray-500">
          Сессий: {card.mentor.mentorProfile?.sessionsCount ?? 0}
        </p>
        {card.mentor.mentorProfile?.contactInfo && (
          <p className="text-sm text-gray-500">
            Контакт: {card.mentor.mentorProfile.contactInfo}
          </p>
        )}
      </div>

      {success ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Заявка отправлена! Ментор свяжется с вами.
        </div>
      ) : isOwnCard ? (
        <p className="text-sm text-gray-400">Это ваша карточка</p>
      ) : !session ? (
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Войти чтобы записаться
        </button>
      ) : !showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Записаться
        </button>
      ) : (
        <div className="border rounded-lg p-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Заявка</h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Ваш уровень</label>
            <select
              value={form.studentLevel}
              onChange={(e) => handleChange("studentLevel", e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Выберите уровень</option>
              {LEVEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Цель сессии</label>
            <textarea
              value={form.goal}
              onChange={(e) => handleChange("goal", e.target.value)}
              className="border rounded px-3 py-2 text-sm resize-none"
              rows={3}
              placeholder="Что хотите получить от сессии..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">
              Удобное время (необязательно)
            </label>
            <input
              type="text"
              value={form.preferredTime}
              onChange={(e) => handleChange("preferredTime", e.target.value)}
              className="border rounded px-3 py-2 text-sm"
              placeholder="например: вечером по будням"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? "Отправка..." : "Отправить заявку"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50 transition"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
