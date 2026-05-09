"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface UserProfileData {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
  image: string | null;
}

export default function ProfileView() {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");

  const loadProfile = async () => {
    setLoading(true);
    const res = await fetch("/api/profile");
    const data = await res.json();
    setProfile(data.profile);
    setName(data.profile.name ?? "");
    setBio(data.profile.bio ?? "");
    setLoading(false);
  };

  const handleSave = async () => {
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio }),
    });
    await loadProfile();
    setIsEditing(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    });
    await loadProfile();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data.profile);
      setName(data.profile.name ?? "");
      setBio(data.profile.bio ?? "");
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}

      {!loading && profile && !isEditing && (
        <div className="max-w-lg mx-auto mt-10 p-6 flex flex-col items-center gap-4">
          <Image
            src={profile.image ?? "/default-avatar.png"}
            alt="avatar"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />

          <div className="text-center">
            <h1 className="text-xl font-bold">{profile.name ?? "No name"}</h1>
            <p className="text-gray-500">{profile.email}</p>
          </div>

          <p className="text-center text-gray-700">
            {profile.bio ?? "No bio added"}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit profile
          </button>
        </div>
      )}

      {!loading && profile && isEditing && (
        <div className="max-w-lg mx-auto mt-10 p-6 flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={profile.image ?? "/default-avatar.png"}
              alt="avatar"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
            <label className="cursor-pointer text-sm text-blue-600 hover:underline">
              Change photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border rounded px-3 py-2"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="About you"
            className="border rounded px-3 py-2 resize-none h-28"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
