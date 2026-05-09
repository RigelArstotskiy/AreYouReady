import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MentorView from "./MentorView";
import StudentView from "./StudentView";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.isMentor) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        techStack: true,
        serviceTypes: true,
      },
    });

    const cards = await prisma.mockupCard.findMany({
      where: { mentorId: session.user.id },
    });

    const sessions = await prisma.session.findMany({
      where: { card: { mentorId: session.user.id } },
      include: {
        student: { select: { name: true, email: true } },
        card: { select: { title: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const sessionsCount = await prisma.session.count({
      where: {
        card: { mentorId: session.user.id },
        status: "completed",
      },
    });

    const sessionIds = sessions.map((s) => s.id);

    const ratingAgg = await prisma.review.aggregate({
      where: { sessionId: { in: sessionIds } },
      _avg: { rating: true },
    });

    const rating = ratingAgg._avg.rating ?? 0;

    return (
      <MentorView
        profile={profile}
        cards={cards}
        sessions={sessions}
        sessionsCount={sessionsCount}
        rating={rating}
      />
    );
  }

  // Student — включаем review чтобы знать оставлен ли отзыв
  const sessions = await prisma.session.findMany({
    where: { studentId: session.user.id },
    include: {
      card: {
        select: {
          title: true,
          priceUsd: true,
          mentor: {
            select: { name: true },
          },
        },
      },
      review: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return <StudentView sessions={sessions} />;
}
