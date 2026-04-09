import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//получаем данные с БД для рендера информации в дешборде
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

//отправляем информацию ментора в БД
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isMentor) {
    //проверка что авторизирован и что это ментор
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json(); //читаю тело запроса

  const profile = await prisma.mentorProfile.create({
    //создаю тело запроса который отправлю
    data: {
      userId: session.user.id,
      position: body.position,
      description: body.description,
      priceUsd: body.priceUsd ?? null,
    },
  });

  return NextResponse.json({ profile });
}
