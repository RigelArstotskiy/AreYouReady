"use client";
//импорты
import { useState, useEffect } from "react";
import CreateProfileForm from "./CreateProfileForm";
import EditProfileForm from "./EditProfileForm";

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
  contactInfo: string | null;
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
  const [isEditing, setIsEditing] = useState(false); // ещё один стейт, но уже для редактирования информации ментора

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
    //теперь Еффект будет автоматически обновлять данные страницы - не нужно будет перезагружать страницу, обновлённый Еффект
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
  // основной рендер, когда данные уже есть
  return (
    <div>
      <h1>Дашборд ментора</h1>

      {isEditing ? (
        <EditProfileForm
          profile={profile}
          onSuccess={() => {
            loadProfile();
            setIsEditing(false);
          }}
        />
      ) : (
        <div>
          <h2>{profile.position}</h2>
          <p>{profile.description}</p>
          <p>{profile.priceUsd ? `$${profile.priceUsd}` : "Бесплатно"}</p>
          <p>{profile.contactInfo ?? "Контакт не указан"}</p>
          <ul>
            {profile.techStack.map((item) => (
              <li key={item.id}>{item.tech}</li>
            ))}
          </ul>
          <ul>
            {profile.serviceTypes.map((item) => (
              <li key={item.id}>{item.serviceType}</li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)}>
            Редактировать профиль
          </button>
        </div>
      )}
    </div>
  );
}
