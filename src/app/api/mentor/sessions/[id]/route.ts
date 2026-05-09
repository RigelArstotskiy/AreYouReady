import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.isMentor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await req.json();

  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // MockupCard.mentorId → User.id (не MentorProfile.id)
  const existingSession = await prisma.session.findFirst({
    where: {
      id: params.id,
      card: {
        mentorId: session.user.id,
      },
    },
  });

  if (!existingSession) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const updated = await prisma.session.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(updated);
}
