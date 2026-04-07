"use client";

//импорты
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

//логика
export default function SignIn() {
  //стейты
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //роутер
  const router = useRouter();

  //хендлер для сабмита
  const handleSubmit = async () => {
    setError(""); //очистка ошибки

    //проверки для earlyReturn-а
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
  //редирект на регистрацию
  const handleRegister = async () => {
    router.push("/register");
  };
  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleSubmit}>
        {loading ? "Выполняется вход" : "Войти"}
      </button>
      <button onClick={handleRegister}>Регистрация</button>
    </div>
  );
}
