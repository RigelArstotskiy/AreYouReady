"use client";
//импорты
import { useState } from "react";

//интерфейсы
interface CreatProfileFormProps {
  onSuccess: () => void; //не почему тут будет такой синтаксис, зачем он нужен, void - потому что функция будет без аргументов?
}

export default function CreateProfileForm({
  onSuccess,
}: CreatProfileFormProps) {
  //стейты
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [priceUsd, setPriceUsd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //кладу данные в БД
  const handleSubmit = () => {
    setLoading(true);

    fetch("/api/mentor/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        position,
        description,
        priceUsd: priceUsd ? parseInt(priceUsd) : null,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        onSuccess(); //вызываю loadProfile в MentorView
      });
  };

  if (loading) return <div>Сохранение...</div>; //в случае успеха пусть отображается для UI

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
      <button onClick={handleSubmit}>Сохранить</button>
      {error && <p>{error}</p>}
    </div>
  );
}
