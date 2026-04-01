"use client";

//импорты
import { useRouter } from "next/navigation"; //тут был router исправил на navigation
import { useState } from "react";
//логика
export default function RegisterForm() {
  //скобки круглые - это объявление параметров функции, они пустые тут потому что формула не принимает данных извне, а сама создаёт свои стейты
  //также помни, что функции в Реакте пишутся с большой буквы с самого начала
  //стейты
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //вроде как больше вне return мне писать ничего не нужно, вся остальная логика идёт в сам ретёрн? Ошибка - в return ТОЛЬКО разметка с уже использованием логики описанной ДО него

  //объявляю роутер чтобы он работал в хендлере
  const router = useRouter();

  //тут указываю handler-ы, которые позже будут работать в разметке
  const handleSubmit = async () => {
    setError(""); //сбросили старую ошибку

    //ошибки в инпутах
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    if (password.length < 6) {
      setError("Пароль минимум 6 символов");
      return;
    }
    if (password.length > 10) {
      //интересно, можно ли как-то аккуратнее или эффективнее объединить два правила по длине пароля?
      setError("Пароль максимум 10 символов");
      return;
    }
    if (!isStudent && !isMentor) {
      setError("Выберите хотя бы одну роль");
      return;
    }

    //отображение обработки запроса
    setLoading(true);
    //сама отправка запроса
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, isStudent, isMentor }),
    });

    //ниже мы объявляем тело запроса, тут что будем использовать request.json?
    const data = await response.json(); //круглые скобки возле json означают "выполни эту функцию", считай что это вызов метода и он тут будет пустым

    //ниже ваполняю проверку успешно ли прошло или нет
    if (!response.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }
    //редирект на нужную мне страницу(можно изменить позже)
    setLoading(false); //это добавил на случаей если после редиректа на логин сделать шаг назад я МОГ создавать нового пользователя и не обновлять страницу ещё раз
    router.push("/login");
  };

  //разметка
  return (
    <div>
      {/* пока что просто создам все инпуты и прочее, более красиво это обработаю позже, я про h1, сейчас главное чтобы работало */}
      <input //email
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input //password
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input //isStudent, но главная загвоздка это как определить value, тут же не оно используется, а что-то по типу change, но не знаю как правильно это писать
        type="checkbox" //обязательно чекбокс, ведь тут флажок, а не инпут
        checked={isStudent} //вот это использовать для поднятия флажка
        onChange={(e) => setIsStudent(e.target.checked)}
      />
      <input //isMentor
        type="checkbox"
        checked={isMentor}
        onChange={(e) => setIsMentor(e.target.checked)}
      />
      {/* также нужно как-то ошибки добавить. пока что добавил вот таку ошибку снизу, но интересно а как добавить ошибку которая например сразу покажет что у человека которкий пароль, они же в самом инпуте пишутся?*/}
      {error && <p>{error}</p>}
      {/* кнопка */}
      <button onClick={handleSubmit}>
        {loading ? "Загрузка..." : "Зарегестрироваться"}
        {/* тут использовал тернарный оператор, пока запрос выполняется показываю "загрузка...", иначе обычный текст*/}
      </button>
    </div>
  );
}
