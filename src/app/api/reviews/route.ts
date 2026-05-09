import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId, rating, text } = await req.json();

  if (!sessionId || !rating || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
  }

  // Проверяем что эта сессия принадлежит студенту и completed
  const bookingSession = await prisma.session.findFirst({
    where: {
      id: sessionId,
      studentId: session.user.id,
      status: "completed",
    },
  });

  if (!bookingSession) {
    return NextResponse.json(
      { error: "Session not found or not completed" },
      { status: 404 },
    );
  }

  // Проверяем что отзыв ещё не оставлен (sessionId unique в Review)
  const existing = await prisma.review.findUnique({
    where: { sessionId },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Review already exists" },
      { status: 409 },
    );
  }

  const review = await prisma.review.create({
    data: {
      sessionId,
      authorId: session.user.id,
      rating,
      text,
    },
  });

  return NextResponse.json({ review });
}
