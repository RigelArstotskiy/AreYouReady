import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//ГЕТ для получения информации профиля из БД
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.user.findUnique({
    //после призмы нужно ведь указать и ментора и студента, просто юзер сойдёт?
    //сойдёт, но нужно в where подставить просто id
    where: { id: session.user.id },
    // include: {}, //вот тут что стоит добавить? ответ: include нет нужны добавлять
  });

  return NextResponse.json({ profile });
}

//ПАТЧ для обновления данных профиля в БД
export async function PATCH(request: Request) {
  //забыл добавить аргументы для PATCH
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, bio } = await request.json();
  //не понимаю почему json ошибку выдаёт по ТС
  //потому что тут нужно было вставить то, что будет обновляться
  const profile = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, bio }, //что-то тут точно нужно
    //вставить то, что будем обновлять в БД
  });

  return NextResponse.json({ profile });
}
