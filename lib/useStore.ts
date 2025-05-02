import { create } from "zustand";
import type { Session } from "next-auth";

type User = Session["user"] | null;

type Store = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useStore;
