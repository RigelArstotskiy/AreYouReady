//импорты
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import StudentView from "./StudentView";

//логика
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    //вернёт на логин если не прошел проверку
    redirect("/login");
  }

  if (!session.user.isMentor) {
    redirect("/"); //возврат на главную страницу для студента, т.к. ему дешборд не нужен
  }

  //разметка
  return (
    <div>
      {session.user.isMentor && (
        <StudentView
          email={session.user.email}
          isStudent={session.user.isStudent}
          isMentor={session.user.isMentor}
        />
      )}
    </div>
  );
}
