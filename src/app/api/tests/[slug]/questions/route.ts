import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const category = await prisma.questionCategory.findUnique({
      where: { slug: params.slug },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    const questions = await prisma.question.findMany({
      where: { categoryId: category.id },
      select: {
        id: true,
        text: true,
        options: {
          select: {
            id: true,
            text: true,
          },
        },
      },
    });
    return NextResponse.json({ category, questions });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}
