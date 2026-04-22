import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

//GET для получения результатов пользователя(конкретного)
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cvResults = await prisma.cvUpload.findMany({
    where: { userId: session.user.id },
    include: { results: true },
  });

  return NextResponse.json({ cvResults });
}

//POST для резюме(в БД)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fileData = await request.formData();

  const file = fileData.get("file") as File; //само резюме
  const position = fileData.get("position") as string; //обязательные опции для корректной оценки
  const experience = fileData.get("experience") as string;

  if (!file || !position || !experience) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  //далее паттерн как по аватарке
  const buffer = Buffer.from(await file.arrayBuffer());

  const ext = file.name.split(".").pop();
  const filename = `${uuid()}.${ext}`; //делаем именно так, потому что для CV нужно уникальное имя на файл
  const filepath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "cvs",
    filename,
  );
  await fs.writeFile(filepath, buffer);

  const cvUrl = `/uploads/cvs/${filename}`;

  const cvUpload = await prisma.cvUpload.create({
    data: {
      userId: session.user.id,
      filePath: cvUrl,
      position,
      experience,
    },
  });

  return NextResponse.json(cvUpload);
}
