"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session, status, update } = useSession();
  console.log("Session: ", session?.user);
  console.log("Status: ", status);
  console.log("Update: ", update);
  if (session) {
    return (
      <div className="flex gap-2 items-center">
        <div>
          Welcome{" "}
          <span className="font-bold">{session.user?.name?.split(" ")[0]}</span>
        </div>
        <div
          className="p-2 cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-sm"
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
        className="p-2 cursor-pointer bg-blue-500 text-white rounded-sm"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
