"use client";

import { useState, useEffect } from "react";
import CreateProfileForm from "./CreateProfileForm";
import EditProfileForm from "./EditProfileForm";
import CreateCardForm from "./CreateCardForm";
import EditCardForm from "./EditCardForm";

export interface MentorViewProps {
  email: string;
  isStudent: boolean;
  isMentor: boolean;
}

interface MentorProfileData {
  id: string;
  position: string;
  description: string;
  priceUsd: number | null;
  contactInfo: string | null;
  techStack: { id: string; tech: string }[];
  serviceTypes: { id: string; serviceType: string }[];
}

interface MentorSession {
  id: string;
  studentLevel: string;
  goal: string;
  status: string;
  student: { name: string | null; email: string };
  card: { title: string; format: string[] };
}

interface MockupCardData {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  format: string[];
  priceUsd: number | null;
}

export default function MentorView({}: MentorViewProps) {
  const [profile, setProfile] = useState<MentorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [cards, setCards] = useState<MockupCardData[]>([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const loadProfile = () => {
    fetch("/api/mentor/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      });

    fetch("/api/mentor/sessions")
      .then((res) => res.json())
      .then((data) => {
        setSessions(data.sessions);
      });

    fetch("/api/marketplace/cards?mine=true")
      .then((res) => res.json())
      .then((data: MockupCardData[]) => {
        setCards(data);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleDeleteCard = async (id: string) => {
    if (!confirm("Удалить карточку?")) return;

    await fetch(`/api/marketplace/cards/${id}`, { method: "DELETE" });
    loadProfile();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Загрузка...
      </div>
    );

  if (!profile)
    return (
      <div className="max-w-lg mx-auto mt-20 flex flex-col items-center gap-4">
        <p className="text-gray-500">Профиль ментора не заполнен</p>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Заполнить данные
        </button>
        {showForm && <CreateProfileForm onSuccess={loadProfile} />}
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Дашборд ментора</h1>

      {isEditing ? (
        <EditProfileForm
          profile={profile}
          onSuccess={() => {
            loadProfile();
            setIsEditing(false);
          }}
        />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="border rounded-lg p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{profile.position}</h2>
            <p className="text-gray-600">{profile.description}</p>
            <p className="text-gray-700">
              {profile.priceUsd ? `$${profile.priceUsd}` : "Бесплатно"}
            </p>
            <p className="text-gray-500 text-sm">
              {profile.contactInfo ?? "Контакт не указан"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Редактировать профиль
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Мои карточки</h2>
              <button
                onClick={() => setShowCardForm(!showCardForm)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {showCardForm ? "Отмена" : "+ Новая карточка"}
              </button>
            </div>

            {showCardForm && (
              <CreateCardForm
                onSuccess={() => {
                  setShowCardForm(false);
                  loadProfile();
                }}
              />
            )}

            {cards.length === 0 ? (
              <p className="text-gray-400">Карточек пока нет</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {cards.map((card) => (
                  <li
                    key={card.id}
                    className="border rounded-lg p-4 flex flex-col gap-1"
                  >
                    {editingCardId === card.id ? (
                      <EditCardForm
                        card={card}
                        onSuccess={() => {
                          setEditingCardId(null);
                          loadProfile();
                        }}
                        onCancel={() => setEditingCardId(null)}
                      />
                    ) : (
                      <>
                        <p className="font-medium">{card.title}</p>
                        <p className="text-sm text-gray-500">
                          {card.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {card.format.join(" + ")}
                        </p>
                        <p className="text-sm text-gray-700">
                          {card.priceUsd ? `$${card.priceUsd}` : "Бесплатно"}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {card.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setEditingCardId(card.id)}
                            className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDeleteCard(card.id)}
                            className="text-sm px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
                          >
                            Удалить
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Входящие заявки</h2>
            {sessions.length === 0 ? (
              <p className="text-gray-400">Заявок пока нет</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {sessions.map((s) => (
                  <li
                    key={s.id}
                    className="border rounded-lg p-4 flex flex-col gap-1"
                  >
                    <p className="font-medium">
                      {s.student.name} — {s.card.title} (
                      {s.card.format.join(" + ")})
                    </p>
                    <p className="text-sm text-gray-500">
                      Уровень: {s.studentLevel}
                    </p>
                    <p className="text-sm text-gray-500">Цель: {s.goal}</p>
                    <span className="text-xs self-start px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                      {s.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
