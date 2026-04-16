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
      setError("Заполните все поля");
      return;
    }
    if (password.length < 6) {
      setError("Пароль минимум 6 символов");
      return;
    }
    if (password.length > 10) {
      setError("Пароль максимум 10 символов");
      return;
    }
    if (!isStudent && !isMentor) {
      setError("Выберите хотя бы одну роль");
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Регистрация</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
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
            <span>Я студент</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isMentor}
              onChange={(e) => setIsMentor(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Я ментор</span>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
}
