"use client";
//импорты
import { useState, useEffect } from "react";

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

  //подтягиваем данные из БД за счёт АПИ роута
  useEffect(() => {
    fetch("/api/mentor/profile") //а не нужно ли тут перед апи поставить src? ответ - не нужно, Next сам сделает всё
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      });
  }, []);

  //early-return рендера перед основным рендером
  if (loading) return <div>Загрузка...</div>; //первый рендер при загрузке
  if (!profile)
    //рендер в случае если данных по профилю нет - первый раз зашел клиент
    return (
      <div>
        Данные не найдены <button>Заполнить данные</button>
      </div>
    );

  // основной рендер, когда данные уже есть
  return <div>{profile.position}</div>;
}
