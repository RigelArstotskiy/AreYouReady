import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isMentor) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const sessions = await prisma.session.findMany({
    where: {
      card: {
        mentorId: session.user.id,
      },
    },
    include: {
      student: true,
      card: {
        select: {
          title: true,
          format: true,
        },
      },
    },
  });

  return NextResponse.json({ sessions });
}
