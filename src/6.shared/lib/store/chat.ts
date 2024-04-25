import { create } from "zustand";

import { ChatType } from "@/5.entities";

interface StoreType {
  chat: ChatType | null;
  setChat: (b: ChatType | null) => void;
  message: string;
  setMessage: (value: string) => void;
  openChatInfo: boolean;
  setOpenChatInfo: (b: boolean) => void;
}

export const useChatStore = create<StoreType>()((setState) => ({
  chat: null,
  setChat: (b) => setState({ chat: b }),
  message: "",
  setMessage: (value) => setState(() => ({ message: value })),
  openChatInfo: false,
  setOpenChatInfo: (b) => setState({ openChatInfo: b }),
}));
