"use client";

import { useState } from "react";

interface EditProfileFormProps {
  profile: {
    position: string;
    description: string;
    priceUsd: number | null;
    contactInfo: string | null;
  };
  onSuccess: () => void;
}

export default function EditProfileForm({
  profile,
  onSuccess,
}: EditProfileFormProps) {
  const [position, setPosition] = useState(profile.position);
  const [description, setDescription] = useState(profile.description);
  const [priceUsd, setPriceUsd] = useState(profile.priceUsd?.toString() ?? "");
  const [contactInfo, setContactInfo] = useState(profile.contactInfo ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch("/api/mentor/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        position,
        description,
        contactInfo,
        priceUsd: priceUsd ? parseInt(priceUsd) : null,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        onSuccess();
      });
  };

  if (loading) return <div className="text-gray-500 text-sm">Saving...</div>;

  return (
    <div className="w-full flex flex-col gap-3">
      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        value={priceUsd}
        onChange={(e) => setPriceUsd(e.target.value)}
        placeholder="Price (optional)"
        type="number"
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        placeholder="Contact info"
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  );
}
