import { create } from "zustand";
import { ChatType } from "@/5.entities";
import { Doc } from "../../../../convex/_generated/dataModel";

type Store = {
  chat: null | ChatType;
  open: (chat: ChatType) => void;
  close: () => void;
  user: Doc<"user"> | null;
  setUser: (user: Doc<"user"> | null) => void;
};

export const useStore = create<Store>()((set) => ({
  chat: null,
  open: (chat) => set(() => ({ chat: chat })),
  close: () => set(() => ({ chat: null })),
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}));
