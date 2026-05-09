"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password.length > 10) {
      setError("Password must be at most 10 characters");
      return;
    }
    if (!isStudent && !isMentor) {
      setError("Please select at least one role");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, isStudent, isMentor }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/login");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Email"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Password"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
              className="w-4 h-4"
            />
            <span>I am a student</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isMentor}
              onChange={(e) => setIsMentor(e.target.checked)}
              className="w-4 h-4"
            />
            <span>I am a mentor</span>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <button
          onClick={() => router.push("/login")}
          className="text-blue-600 text-sm text-center hover:underline"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}
