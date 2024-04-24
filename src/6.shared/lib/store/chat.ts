import { create } from "zustand";
import { ChatType } from "@/5.entities";

interface StoreType {
  chat: ChatType | null;
  setChat: (b: ChatType | null) => void;
  message: string;
  setMessage: (value: string) => void;
}

export const useChatStore = create<StoreType>()((setState, getState) => ({
  chat: null,
  setChat: (b) => setState({ chat: b }),
  message: "",
  setMessage: (value) => setState(() => ({ message: value })),
}));
