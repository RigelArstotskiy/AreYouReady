import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    //шаг 0. получил данные из тела запроса
    const { email, password } = await request.json();
    //шаг 1. проверяем пустое ли поле
    if (!email || !password) {
      return NextResponse.json({ message: "Заполните поля" }, { status: 400 });
    }
    if (password.length < 6) {
      //вот тут проверку на длину нужно сделать
      return NextResponse.json(
        { message: "Пароль короче 6 символов" },
        { status: 400 },
      );
    }
    //шаг 2. проверка пользователя на уникальность
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      // если нашли — значит уже существует
      return NextResponse.json(
        { message: "Почта уже существует" },
        { status: 400 },
      );
    }
    //шаг 3. хеширование пароля
    const hashPassword = await bcrypt.hash(password, 10);
    //шаг 4. создание пользователя
    await prisma.user.create({
      data: {
        password: hashPassword, //т.к. отправляем через Призму, нужно в этом объекте использовать то что я описывал в схеме Призмы
        email,
        isStudent: false,
        isMentor: false,
      },
    });
    //шаг 5. успешное создание пользователя
    return NextResponse.json(
      { message: "Пользователь успешно зарегестрирован" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "Ошибка" }, { status: 500 });
  }
}
