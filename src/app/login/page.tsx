"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Заполните поля формы");
      return;
    }
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result?.ok) {
      setError("Неверный email или пароль");
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Вход</h1>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          {loading ? "Выполняется вход..." : "Войти"}
        </button>
        <button
          onClick={() => router.push("/register")}
          className="text-blue-600 text-sm text-center hover:underline"
        >
          Нет аккаунта? Зарегистрироваться
        </button>
      </div>
    </div>
  );
}
