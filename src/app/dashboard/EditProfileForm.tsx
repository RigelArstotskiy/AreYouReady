"use client";
//импорты
import { useState } from "react";
//интерфейс
interface EditProfileFormProps {
  profile: {
    position: string;
    description: string;
    priceUsd: number | null;
    contactInfo: string | null;
  };
  onSuccess: () => void;
}
//логика
export default function EditProfileForm({
  profile,
  onSuccess,
}: EditProfileFormProps) {
  //стейты - я не знаю как мне вставить то что уже известно, просто поставить в скобках стейта position я не могу, как правильно?
  const [position, setPosition] = useState(profile.position);
  const [description, setDescription] = useState(profile.description);
  const [priceUsd, setPriceUsd] = useState(profile.priceUsd?.toString() ?? "");
  const [contactInfo, setContactInfo] = useState(profile.contactInfo ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //обновляю данные в БД(метод PATCH)
  const handleSubmit = () => {
    setLoading(true);

    fetch("/api/mentor/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        position,
        description,
        contactInfo,
        priceUsd: priceUsd ? parseInt(priceUsd) : null,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        onSuccess(); //вызываю loadProfile в MentorView
      });
  };

  if (loading) return <div>Сохранение...</div>;

  return (
    <div>
      {" "}
      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Позиция"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
      />
      <input
        value={priceUsd}
        onChange={(e) => setPriceUsd(e.target.value)}
        placeholder="Цена (необязательно)"
        type="number"
      />
      <input
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        placeholder="Контактные данные"
      />
      <button onClick={handleSubmit}>Сохранить</button>
      {error && <p>{error}</p>}
    </div>
  );
}
