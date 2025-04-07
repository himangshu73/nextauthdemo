"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (status === "authenticated") {
    return (
      <div className="flex gap-2 items-center">
        <div>
          Welcome{" "}
          <span className="font-bold">{session.user?.name?.split(" ")[0]}</span>
        </div>
        <div
          className="px-2 py-1 cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-sm"
          onClick={() => signOut()}
        >
          Logout
        </div>
      </div>
    );
  }
  return (
    <div>
      <button
        className="px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-sm"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
