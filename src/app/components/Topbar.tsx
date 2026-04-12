import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Topbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav>
      {" "}
      <Link href="/">Are You Ready?</Link>
      <Link href="/dashboard">Dashboard</Link>
      {session ? (
        <div>
          <LogoutButton />
        </div>
      ) : (
        <Link href="/login">Войти</Link>
      )}
    </nav>
  );
}
