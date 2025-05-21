import Link from "next/link";
import SignIn from "./sign-in";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SignOut from "./sign-out";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session?.user.name);

  return (
    <nav className="bg-white shadow-md p-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Himangshu.xyz
        </Link>
        {session ? <SignOut /> : <SignIn />}
      </div>
    </nav>
  );
}
