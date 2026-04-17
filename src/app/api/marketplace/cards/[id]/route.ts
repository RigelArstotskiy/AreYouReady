import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const card = await prisma.mockupCard.findUnique({
    where: { id: params.id },
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

  if (!card) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getServerSession(authOptions as any);

  if (!session?.user?.id || !session.user.isMentor) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const card = await prisma.mockupCard.findUnique({
    where: { id: params.id },
  });

  if (!card) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (card.mentorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, techStack, format, priceUsd } = body;

  const updated = await prisma.mockupCard.update({
    where: { id: params.id },
    data: {
      title,
      description,
      techStack: techStack ?? [],
      format,
      priceUsd: priceUsd ?? null,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getServerSession(authOptions as any);

  if (!session?.user?.id || !session.user.isMentor) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const card = await prisma.mockupCard.findUnique({
    where: { id: params.id },
  });

  if (!card) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (card.mentorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.mockupCard.delete({ where: { id: params.id } });

  return NextResponse.json({ ok: true });
}
