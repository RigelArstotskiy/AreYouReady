import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mine = searchParams.get("mine");

  let mentorId: string | undefined = undefined;

  if (mine === "true") {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    mentorId = session.user.id;
  }

  const cards = await prisma.mockupCard.findMany({
    where: mentorId ? { mentorId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      mentor: {
        select: {
          id: true,
          name: true,
          image: true,
          mentorProfile: {
            select: {
              contactInfo: true,
              rating: true,
              sessionsCount: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.isMentor) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, techStack, format, priceUsd } = body;

  if (!title || !description || !format) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const card = await prisma.mockupCard.create({
    data: {
      mentorId: session.user.id,
      title,
      description,
      techStack: techStack ?? [],
      format,
      priceUsd: priceUsd ?? null,
    },
  });

  return NextResponse.json(card, { status: 201 });
}
