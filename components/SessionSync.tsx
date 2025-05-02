"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useStore from "@/lib/useStore";

const SessionSync = () => {
  const { data: session, status } = useSession();
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
    } else if (status === "unauthenticated") {
      clearUser();
    }
  }, [status, session?.user, setUser, clearUser]);
  return null;
};

export default SessionSync;
