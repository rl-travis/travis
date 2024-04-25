import { create } from "zustand";
import { Doc } from "../../../../convex/_generated/dataModel";

type Store = {
  user: Doc<"user"> | null;
  setUser: (user: Doc<"user"> | null) => void;
};

export const useUserStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}));
