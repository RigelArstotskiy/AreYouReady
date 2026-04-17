import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { cardId, studentLevel, goal, preferredTime } = body;

  if (!cardId || !studentLevel || !goal) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const card = await prisma.mockupCard.findUnique({
    where: { id: cardId },
  });

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }
  if (card.mentorId === session.user.id) {
    return NextResponse.json(
      { error: "Cannot book your own card" },
      { status: 403 },
    );
  }
  const created = await prisma.session.create({
    data: {
      studentId: session.user.id,
      cardId,
      studentLevel,
      goal,
      preferredTime: preferredTime ?? null,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
