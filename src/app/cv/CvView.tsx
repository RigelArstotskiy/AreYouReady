"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface CvResult {
  id: string;
  score: number;
  rawJson: string;
  createdAt: Date;
}

interface CvUpload {
  id: string;
  filePath: string;
  position: string;
  experience: string;
  createdAt: Date;
  results: CvResult[];
}

interface Props {
  cvUploads: CvUpload[];
}

export default function CvView({ cvUploads }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<CvResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedUpload, setSelectedUpload] = useState<CvUpload | null>(null);

  const router = useRouter(); //чтобы обновлялись результаты

  //отправляем на /api/cv
  async function handleUpload() {
    if (!file || !position || !experience) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("position", position);
    formData.append("experience", experience);

    const res = await fetch("/api/cv", {
      method: "POST",
      body: formData,
    });
    return await res.json();
  }

  //главная кнопка, делаем два шага последовательно
  async function handleAnalyze() {
    setAnalyzing(true);

    const cvUpload = await handleUpload();

    const res = await fetch("/api/cv/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvId: cvUpload.id }),
    });

    const result = await res.json();
    setCurrentResult(result);
    setAnalyzing(false);
    setFile(null);
    router.refresh();
    setPosition("");
    setExperience("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const displayResult =
    currentResult ??
    selectedUpload?.results[selectedUpload.results.length - 1] ??
    null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Форма загрузки */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">CV Analyzer</h1>

        {/* Скрытый инпут */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {/* Дроп-зона */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const dropped = e.dataTransfer.files?.[0] ?? null;
            setFile(dropped);
          }}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
        >
          {file ? (
            <p className="text-sm text-blue-600 font-medium">{file.name}</p>
          ) : (
            <>
              <p className="text-gray-500 text-sm">Drag & drop your CV here</p>
              <p className="text-blue-600 text-sm mt-1 underline">
                or click to choose file
              </p>
            </>
          )}
        </div>

        <input
          type="text"
          placeholder="Target position (e.g. Frontend Developer)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />

        <input
          type="text"
          placeholder="Experience level (e.g. Junior, Middle, Senior)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />

        <button
          onClick={handleAnalyze}
          disabled={!file || !position || !experience || analyzing}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {analyzing ? "Analyzing..." : "Analyze CV"}
        </button>
      </div>

      {/* Результат */}
      {displayResult &&
        (() => {
          const parsed = JSON.parse(displayResult.rawJson);
          return (
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Result</h2>
                <span className="text-3xl font-bold text-blue-600">
                  {displayResult.score}/100
                </span>
              </div>

              <p className="text-gray-700">{parsed.summary}</p>

              <div>
                <h3 className="font-semibold text-green-600 mb-1">Strengths</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {parsed.strengths.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-red-500 mb-1">Weaknesses</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {parsed.weaknesses.map((w: string, i: number) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Recommendations
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {parsed.recommendations.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}

      {/* История */}
      {cvUploads.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-bold">History</h2>
          {cvUploads.map((cv) => (
            <div
              key={cv.id}
              onClick={() => {
                setCurrentResult(null);
                setSelectedUpload(cv);
              }}
              className="border rounded-lg p-4 space-y-2 cursor-pointer hover:border-blue-400 transition-colors"
            >
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {cv.position} · {cv.experience}
                </span>
                <span>
                  {new Date(cv.createdAt).toISOString().split("T")[0]}
                </span>
              </div>
              {cv.results.length > 0 && (
                <div className="text-sm font-medium text-blue-600">
                  Last score: {cv.results[cv.results.length - 1].score}/100
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
