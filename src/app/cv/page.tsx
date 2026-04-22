import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CvView from "./CvView";
import { prisma } from "@/lib/prisma";

export default async function CvPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const cvUploads = await prisma.cvUpload.findMany({
    where: { userId: session.user.id },
    include: { results: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <CvView cvUploads={cvUploads} />
    </div>
  );
}
