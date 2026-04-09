"use client";
//импорты
import { useState, useEffect } from "react";
import CreateProfileForm from "./CreateProfileForm";

//интерфейсы
export interface MentorViewProps {
  email: string;
  isStudent: boolean;
  isMentor: boolean;
}
interface MentorProfileData {
  //взял значения из схемы призмы
  id: string;
  position: string;
  description: string;
  priceUsd: number | null;
  techStack: { id: string; tech: string }[];
  serviceTypes: { id: string; serviceType: string }[];
}

export default function MentorView({
  email,
  isStudent,
  isMentor,
}: MentorViewProps) {
  //стейты
  const [profile, setProfile] = useState<MentorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); //новый стейт для отображения формы для внесения информации про ментора

  //подтягиваем данные из БД за счёт АПИ роута, перетаскиваю это в новую функцию которую использовать для ручной инвалидации
  const loadProfile = () => {
    //новая функция
    fetch("/api/mentor/profile") //а не нужно ли тут перед апи поставить src? ответ - не нужно, Next сам сделает всё
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      });
  };

  useEffect(() => {
    //тереь Еффект будет автоматически обновлять данные страницы - не нужно будет перезагружать страницу, обновлённый Еффект
    loadProfile();
  }, []);

  //early-return рендера перед основным рендером
  if (loading) return <div>Загрузка...</div>; //первый рендер при загрузке
  if (!profile)
    //рендер в случае если данных по профилю нет - первый раз зашел клиент, обновлён
    return (
      <div>
        <button onClick={() => setShowForm(true)}>Заполнить данные</button>
        {showForm && <CreateProfileForm onSuccess={loadProfile} />}
      </div>
    );

  // основной рендер, когда данные уже есть
  return (
    <div>
      {" "}
      <h1>Дашборд ментора</h1>
      <div>
        <h2>{profile.position}</h2>
        <p>{profile.description}</p>
        <p>{profile.priceUsd ? `$${profile.priceUsd}` : "Бесплатно"}</p>
      </div>
      <button>Редактировать профиль</button>
    </div>
  );
}
