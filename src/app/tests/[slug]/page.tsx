import { notFound } from "next/navigation";
import Link from "next/link";
import TestRunner from "./TestRunner";
import { prisma } from "@/lib/prisma";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

async function getQuestions(slug: string) {
  const category = await prisma.questionCategory.findUnique({
    where: { slug },
  });

  if (!category) return null;

  const questions = await prisma.question.findMany({
    where: { categoryId: category.id },
    select: {
      id: true,
      text: true,
      options: {
        select: { id: true, text: true },
      },
    },
  });

  return { category, questions };
}

export default async function TestPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getQuestions(params.slug);

  if (!data) notFound();

  const { category, questions } = data;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/tests"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← All categories
          </Link>
          <span className="text-gray-200">|</span>
          <h1 className="text-sm font-semibold text-gray-700">
            {category.name}
          </h1>
          <span className="ml-auto text-sm text-gray-400">
            {questions.length} questions
          </span>
        </div>
      </div>

      <TestRunner slug={params.slug} initialQuestions={questions} />
    </main>
  );
}
