"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  return (
    <div className="px-6 py-4">
      <h1>Welcome to Homepage of Next-Auth Demo.</h1>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "authenticated" ? (
        <div>Authenticated</div>
      ) : (
        <div>Unauthenticated</div>
      )}
    </div>
  );
}
