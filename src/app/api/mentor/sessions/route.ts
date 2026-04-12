import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//ГЕТ - найти все сессии где mentorId совпадает с профилем текущего ментора
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isMentor) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.mentorProfile.findUnique({
    //вот это делаю для того чтобы сначала найти профиль ментора и взять его id
    //потому что mentorId в Session это id из MentorProfile, не userId
    where: { userId: session.user.id },
  });

  if (!profile) {
    //проверил что профиль существует
    return NextResponse.json({ error: "Профиль не найден" }, { status: 404 });
  }

  const sessions = await prisma.session.findMany({
    // а вот тут используя id который нашел выше, ищу сессии
    where: { mentorId: profile.id },
    include: { student: true }, //чтобы показать ментору данные студента (имя, почта) нужно включить связанную запись
  });

  return NextResponse.json({ sessions });
}
