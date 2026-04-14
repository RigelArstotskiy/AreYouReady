import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default async function Topbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav>
      {" "}
      <Link href="/">Are You Ready?</Link>
      <Link href="/dashboard">Dashboard</Link>
      {session ? (
        <UserMenu email={session.user.email ?? ""} />
      ) : (
        <Link href="/login">Войти</Link>
      )}
    </nav>
  );
}
