"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
  email: string;
}

export default function UserMenu({ email }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}>{email}</button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            background: "white",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 8,
            minWidth: 160,
          }}
        >
          <Link href="/profile" onClick={() => setOpen(false)}>
            <div style={{ padding: "8px 12px", cursor: "pointer" }}>
              Профиль
            </div>
          </Link>
          <div
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{ padding: "8px 12px", cursor: "pointer", color: "red" }}
          >
            Выход
          </div>
        </div>
      )}
    </div>
  );
}
