import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

//ПОСТ для аватара профиля
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("avatar") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  //1. читаю файл как ArrayBuffer, конвертирую в Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  //2. собираю имя файла и путь куда писать на диск
  const ext = file.name.split(".").pop();
  const filename = `avatar-${session.user.id}.${ext}`;
  const filepath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "avatars",
    filename,
  );

  //3. записываю на диск
  await writeFile(filepath, buffer);

  //4. Путь дял БД и браузера - без /public/
  const imageUrl = `/uploads/avatars/${filename}`;

  //5. Сохраняю в БД
  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: imageUrl },
  });

  //6. возвращаю новый путь
  return NextResponse.json({ imageUrl });
}
