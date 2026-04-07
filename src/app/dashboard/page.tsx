//импорты
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

//логика
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    //вернёт на логин если не прошел проверку
    redirect("/login");
  }

  //разметка
  return (
    <div>
      <h1>Дешборд</h1>
      <p>Привет, {session.user.email}</p>
      {session.user.isStudent && <p>Ты студент</p>}
      {session.user.isMentor && <p>Ты ментор</p>}
    </div>
  );
}
