import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import Groq from "groq-sdk";
import { extractText } from "unpdf";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { cvId } = body;

  const cvUpload = await prisma.cvUpload.findUnique({
    where: { id: cvId },
  });

  if (!cvUpload) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (cvUpload.userId !== session.user.id) {
    //защита от показа чужих карточек
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const fileBuffer = await fs.readFile(
    path.join(process.cwd(), "public", cvUpload.filePath),
  );
  const extracted = await extractText(new Uint8Array(fileBuffer), {
    mergePages: true,
  });
  const text = extracted.text;

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });
  const prompt = `
You are an ATS (Applicant Tracking System) analyzer.
Analyze this resume for a ${cvUpload.position} position.
Candidate experience level: ${cvUpload.experience}.

Resume text:
${text}

Respond ONLY with a valid JSON object, no markdown, no explanation:
{
  "score": <number 0-100>,
  "summary": "<overall assessment>",
  "strengths": ["<strength1>", "<strength2>"],
  "weaknesses": ["<weakness1>", "<weakness2>"],
  "recommendations": ["<rec1>", "<rec2>"]
}
`;
  const message = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1024,
  });

  const rawJson = (message.choices[0].message.content ?? "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed_result = JSON.parse(rawJson);

  const cvResult = await prisma.cvResult.create({
    data: {
      cvId: cvUpload.id,
      score: parsed_result.score,
      rawJson: rawJson,
    },
  });

  return NextResponse.json(cvResult);
}
