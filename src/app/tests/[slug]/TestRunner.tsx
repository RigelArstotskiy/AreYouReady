"use client";

import { useState, useEffect } from "react";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface ResultQuestion {
  id: string;
  text: string;
  options: Array<Option & { isCorrect: boolean }>;
}

interface SubmitResult {
  total: number;
  correct: number;
  questions: ResultQuestion[];
}

interface TestRunnerProps {
  slug: string;
  initialQuestions: Question[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TestRunner({
  slug,
  initialQuestions,
}: TestRunnerProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Shuffle after hydration to avoid server/client mismatch
  useEffect(() => {
    setQuestions(shuffle(initialQuestions));
  }, []);

  const question = questions[current];
  const selectedAnswer = question ? answers[question.id] : undefined;
  const isLast = current === questions.length - 1;

  function handleSelect(answerId: string) {
    if (result || !question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: answerId }));
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  }

  async function handleSubmit() {
    const payload = questions.map((q) => ({
      questionId: q.id,
      answerId: answers[q.id] ?? "",
    }));

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/tests/${slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message ?? "Something went wrong");
        return;
      }

      const data: SubmitResult = await res.json();
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleRestart() {
    setResult(null);
    setCurrent(0);
    setAnswers({});
    setError("");
    setQuestions(shuffle(initialQuestions));
  }

  // ── Result screen ────────────────────────────────────────────────
  if (result) {
    const percentage = Math.round((result.correct / result.total) * 100);

    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center mb-8">
          <p className="text-5xl font-bold text-gray-900 mb-1">
            {result.correct}
            <span className="text-2xl text-gray-400 font-normal">
              /{result.total}
            </span>
          </p>
          <p className="text-gray-500 mt-1">{percentage}% correct</p>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-5 mb-8">
          {result.questions.map((q, idx) => {
            const userAnswerId = answers[q.id];
            const userOption = q.options.find((o) => o.id === userAnswerId);
            const isCorrect = userOption?.isCorrect === true;

            return (
              <div
                key={q.id}
                className={`bg-white border rounded-xl p-5 ${
                  isCorrect ? "border-green-200" : "border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg">
                    {isCorrect ? "✅" : "❌"}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-3">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isUserPick = opt.id === userAnswerId;
                        const isRight = opt.isCorrect;

                        let cls = "text-sm px-3 py-2 rounded-lg border ";
                        if (isRight) {
                          cls += "border-green-400 bg-green-50 text-green-800";
                        } else if (isUserPick && !isRight) {
                          cls += "border-red-300 bg-red-50 text-red-700";
                        } else {
                          cls += "border-gray-100 bg-gray-50 text-gray-500";
                        }

                        return (
                          <div key={opt.id} className={cls}>
                            {opt.text}
                            {isRight && (
                              <span className="ml-2 text-xs font-medium text-green-600">
                                ✓ correct
                              </span>
                            )}
                            {isUserPick && !isRight && (
                              <span className="ml-2 text-xs font-medium text-red-500">
                                your answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {!userAnswerId && (
                      <p className="text-xs text-gray-400 mt-2">
                        — not answered
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Test screen ──────────────────────────────────────────────────
  if (!question) return null;

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-7 mb-5">
        <p className="text-lg font-semibold text-gray-900 mb-6">
          {question.text}
        </p>
        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-800 font-medium"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>

        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm"
          >
            {loading ? "Submitting…" : "Submit Test"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm"
          >
            Next →
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-5 justify-center">
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => setCurrent(idx)}
            className={`w-7 h-7 rounded-full text-xs font-medium transition-all ${
              idx === current
                ? "bg-blue-600 text-white"
                : answers[q.id]
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
