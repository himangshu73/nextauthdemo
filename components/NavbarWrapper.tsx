import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Navbar from "./navbar";

export default async function NavbarWrapper() {
  const session = await getServerSession(authOptions);

  return <Navbar session={session} />;
}
