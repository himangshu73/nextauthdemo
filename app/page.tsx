"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();
  return (
    <div className="px-6 py-4">
      <h1>Welcome to Homepage of Next-Auth Demo.</h1>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "authenticated" ? (
        <div className="flex flex-col gap-4">
          <Link href="/todolist">To Do List</Link>
          <Link href="/expensetracker">Expense Tracker</Link>
        </div>
      ) : (
        <div>
          <Link href="/signup">SignUp</Link>
        </div>
      )}
    </div>
  );
}
