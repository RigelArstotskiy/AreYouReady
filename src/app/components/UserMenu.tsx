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
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm px-3 py-1.5 rounded border hover:bg-gray-100 transition"
      >
        {email}
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white border rounded-lg shadow-md z-50 overflow-hidden">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50 transition"
          >
            Профиль
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 transition"
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
}
