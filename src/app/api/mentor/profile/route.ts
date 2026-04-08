import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//логика
export async function GET() {
  const session = await getServerSession(authOptions); //получаем объект сессии

  if (!session || !session.user.isMentor) {
    //не авторизирован или не ментор = ошибка
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.mentorProfile.findUnique({
    //создаём тело запроса
    where: { userId: session.user.id }, //это стандартный синтаксис метода findUnique
    include: {
      // взял их из схемы призмы
      techStack: true,
      serviceTypes: true,
    },
  });

  return NextResponse.json({ profile }); //отправляем тело
}
