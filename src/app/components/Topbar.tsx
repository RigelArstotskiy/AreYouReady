import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default async function Topbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full border-b px-6 py-3 flex items-center justify-between relative">
      {/* Лого — слева */}
      <Link href="/" className="font-bold text-lg shrink-0">
        Are You Ready?
      </Link>

      {/* Навигация — по центру */}
      <div className="flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
        <Link
          href="/marketplace"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          Маркетплейс
        </Link>
        <Link
          href="/cv"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          CV
        </Link>
        <Link
          href="/tests"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          Тесты
        </Link>
        <Link
          href="/dashboard"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          Dashboard
        </Link>
      </div>

      {/* Юзер-меню — справа */}
      {session ? (
        <UserMenu email={session.user.email ?? ""} />
      ) : (
        <Link
          href="/login"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition shrink-0"
        >
          Войти
        </Link>
      )}
    </nav>
  );
}
