"use client";

import { useState } from "react";

const SUGGESTED_TAGS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Next.js",
  "SQL",
  "Python",
  "Docker",
  "CSS",
  "GraphQL",
];

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ value, onChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = SUGGESTED_TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(tag),
  );

  const addTag = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const toAdd = filtered[0] ?? inputValue.trim();
      if (toAdd) addTag(toAdd);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-500 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Add technology..."
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {isOpen && filtered.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
            {filtered.map((tag) => (
              <li
                key={tag}
                onMouseDown={() => addTag(tag)}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
