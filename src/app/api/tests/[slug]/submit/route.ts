import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface AnswerPayload {
  questionId: string;
  answerId: string;
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const answers: AnswerPayload[] = body.answers;

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { message: "No answers provided" },
        { status: 400 },
      );
    }

    const category = await prisma.questionCategory.findUnique({
      where: { slug: params.slug },
    });
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }
    //фетчу правильный ответ из БД
    const answerIds = answers.map((a) => a.answerId);
    const correctOptions = await prisma.answerOption.findMany({
      where: { id: { in: answerIds } },
      select: { id: true, isCorrect: true, questionId: true },
    });

    const correctMap = new Map(correctOptions.map((o) => [o.id, o.isCorrect]));

    const total = answers.length;
    const correct = answers.filter(
      (a) => correctMap.get(a.answerId) === true,
    ).length;

    //сохраняю результат
    await prisma.testResult.create({
      data: {
        userId: session.user.id,
        categoryId: category.id,
        total,
        correct,
      },
    });

    //возвращаю ответы на вопросы
    const questionIds = answers.map((a) => a.questionId);
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      select: {
        id: true,
        text: true,
        options: {
          select: { id: true, text: true, isCorrect: true },
        },
      },
    });
    return NextResponse.json({ total, correct, questions });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to submit answers" },
      { status: 500 },
    );
  }
}
