"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface MockupCard {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  format: string[];
  priceUsd: number | null;
  mentor: {
    name: string | null;
    image: string | null;
    mentorProfile: {
      rating: number;
      sessionsCount: number;
    } | null;
  };
}

const FORMAT_OPTIONS = [
  { value: "interview", label: "Интервью" },
  { value: "codereview", label: "Код-ревью" },
  { value: "cvreview", label: "CV ревью" },
];

export default function MarketplacePage() {
  const [cards, setCards] = useState<MockupCard[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterTech, setFilterTech] = useState("");
  const [filterFormat, setFilterFormat] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");

  useEffect(() => {
    fetch("/api/marketplace/cards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      });
  }, []);

  const filtered = cards.filter((card) => {
    if (
      filterTech &&
      !card.techStack.some((t) =>
        t.toLowerCase().includes(filterTech.toLowerCase()),
      )
    )
      return false;

    if (filterFormat && !card.format.includes(filterFormat)) return false;

    if (filterPrice === "free" && card.priceUsd !== null) return false;
    if (filterPrice === "paid" && card.priceUsd === null) return false;

    return true;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Загрузка...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Маркетплейс мок-интервью</h1>

      <div className="flex flex-wrap gap-4 p-4 border rounded-lg bg-gray-50">
        <input
          type="text"
          value={filterTech}
          onChange={(e) => setFilterTech(e.target.value)}
          placeholder="Поиск по стеку..."
          className="border rounded px-3 py-2 text-sm"
        />

        <select
          value={filterFormat}
          onChange={(e) => setFilterFormat(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Все форматы</option>
          {FORMAT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">Любая цена</option>
          <option value="free">Бесплатно</option>
          <option value="paid">Платно</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400">Карточек не найдено</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((card) => (
            <Link
              key={card.id}
              href={`/marketplace/${card.id}`}
              className="border rounded-lg p-4 flex flex-col gap-2 hover:shadow-md transition"
            >
              <p className="font-semibold">{card.title}</p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {card.description}
              </p>

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
                    {FORMAT_OPTIONS.find((o) => o.value === f)?.label ?? f}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <p className="text-sm font-medium">
                  {card.priceUsd ? `$${card.priceUsd}` : "Бесплатно"}
                </p>
                <p className="text-xs text-gray-400">
                  {card.mentor.name ?? "Ментор"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
