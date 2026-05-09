"use client";

import { useState } from "react";
import TagInput from "./TagInput";

const FORMAT_OPTIONS = [
  { value: "interview", label: "Interview" },
  { value: "codereview", label: "Code Review" },
  { value: "cvreview", label: "CV Review" },
];

interface EditCardFormProps {
  card: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    format: string[];
    priceUsd: number | null;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditCardForm({
  card,
  onSuccess,
  onCancel,
}: EditCardFormProps) {
  const [form, setForm] = useState({
    title: card.title,
    description: card.description,
    priceUsd: card.priceUsd?.toString() ?? "",
  });
  const [techStack, setTechStack] = useState<string[]>(card.techStack);
  const [formats, setFormats] = useState<string[]>(card.format);
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

    const res = await fetch(`/api/marketplace/cards/${card.id}`, {
      method: "PATCH",
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
      setError("Failed to save changes");
      return;
    }

    onSuccess();
  };

  return (
    <div className="border rounded-lg p-6 flex flex-col gap-4 bg-gray-50">
      <h2 className="text-lg font-semibold">Edit Card</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="border rounded px-3 py-2 text-sm resize-none"
          rows={3}
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

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
