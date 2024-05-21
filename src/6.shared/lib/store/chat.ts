import { create } from "zustand";

import { ChatType } from "@/5.entities";

type statusSidebarType = "info" | "emoji" | null;

interface StoreType {
  chat: ChatType | null;
  setChat: (b: ChatType | null) => void;
  message: string;
  setMessage: (value: string) => void;
  statusSidebar: statusSidebarType;
  setStatusSidebar: (s: statusSidebarType) => void;
  addEmoji: (e: string) => void;
}

export const useChatStore = create<StoreType>()((setState, get) => ({
  chat: null,
  setChat: (b) => setState({ chat: b }),
  message: "",
  setMessage: (value) => setState(() => ({ message: value })),
  statusSidebar: null,
  setStatusSidebar: (s) => setState({ statusSidebar: s }),
  addEmoji: (e) => setState({ message: get().message + e }),
}));
