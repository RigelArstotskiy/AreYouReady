"use client"; // забыл изначально добавить

//импорт, ?? какой тут импорт вставить?
import { SessionProvider } from "next-auth/react";

//?? тут будет экспортная функция которую назовём provider
export function Providers({ children }: { children: React.ReactNode }) {
  //Реакт.РеактНод - это "всё что Реакт может отрендерить"
  //?? внутри функции я не знаю как правильно синтаксис выглядит, я никогда этого не далал, так что не знаю
  return <SessionProvider>{children}</SessionProvider>;
}
