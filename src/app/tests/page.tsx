import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Category {
  id: string;
  name: string;
  slug: string;
}

async function getCategories() {
  return prisma.questionCategory.findMany({
    orderBy: { name: "asc" },
  });
}

const categoryMeta: Record<string, { emoji: string; description: string }> = {
  javascript: {
    emoji: "🟨",
    description: "Closures, prototypes, async, event loop and more",
  },
  typescript: {
    emoji: "🔷",
    description: "Types, generics, utility types, narrowing",
  },
  react: {
    emoji: "⚛️",
    description: "Hooks, rendering, state management, performance",
  },
  nextjs: {
    emoji: "▲",
    description: "App Router, server components, routing, middleware",
  },
  nodejs: {
    emoji: "🟩",
    description: "Event loop, streams, modules, Express middleware",
  },
  css: {
    emoji: "🎨",
    description: "Box model, flexbox, grid, specificity, animations",
  },
  "cs-fundamentals": {
    emoji: "🧠",
    description: "Algorithms, data structures, HTTP, REST, Git",
  },
};

export default async function TestsPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Practice Tests</h1>
          <p className="mt-2 text-gray-500">
            Choose a category and test your knowledge. Questions are shuffled on
            every attempt.
          </p>
        </div>

        <div className="grid gap-4">
          {categories.map((category) => {
            const meta = categoryMeta[category.slug] ?? {
              emoji: "📚",
              description: "",
            };

            return (
              <Link
                key={category.id}
                href={`/tests/${category.slug}`}
                className="flex items-center gap-5 bg-white border border-gray-200 rounded-xl px-6 py-5 hover:border-blue-400 hover:shadow-sm transition-all group"
              >
                <span className="text-3xl">{meta.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </p>
                  {meta.description && (
                    <p className="text-sm text-gray-400 mt-0.5 truncate">
                      {meta.description}
                    </p>
                  )}
                </div>
                <span className="text-gray-300 group-hover:text-blue-400 transition-colors text-xl">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
