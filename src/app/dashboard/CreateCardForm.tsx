"use client";

import { useState } from "react";
import TagInput from "./TagInput";

const FORMAT_OPTIONS = [
  { value: "interview", label: "Interview" },
  { value: "codereview", label: "Code Review" },
  { value: "cvreview", label: "CV Review" },
];

interface CreateCardFormProps {
  onSuccess: () => void;
}

export default function CreateCardForm({ onSuccess }: CreateCardFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priceUsd: "",
  });
  const [techStack, setTechStack] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const toggleFormat = (value: string) => {
    if (formats.includes(value)) {
      setFormats(formats.filter((f) => f !== value));
    } else {
      setFormats([...formats, value]);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.title || !form.description) {
      setError("Please fill in the title and description");
      return;
    }

    if (formats.length === 0) {
      setError("Please select at least one format");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/marketplace/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        techStack,
        format: formats,
        priceUsd: form.priceUsd ? parseInt(form.priceUsd) : null,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to create card");
      return;
    }

    onSuccess();
  };

  return (
    <div className="border rounded-lg p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">New Card</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
          placeholder="e.g. React Mock Interview"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="border rounded px-3 py-2 text-sm resize-none"
          rows={3}
          placeholder="What's included in the session, what to expect..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Tech stack</label>
        <TagInput value={techStack} onChange={setTechStack} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Format</label>
        {FORMAT_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formats.includes(opt.value)}
              onChange={() => toggleFormat(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Price (USD)</label>
        <input
          type="number"
          value={form.priceUsd}
          onChange={(e) => handleChange("priceUsd", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
          placeholder="Leave empty if free"
          min={0}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create card"}
      </button>
    </div>
  );
}
