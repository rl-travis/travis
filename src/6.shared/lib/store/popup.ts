import { Id } from "../../../../convex/_generated/dataModel";

import { create } from "zustand";

import { MessageType } from "@/5.entities";

type DeedType = {
  type: "message" | "chat";
  x: number;
  y: number;
  width: number;
  height: number;
  chat_id?: Id<"user_chat">;
  pinned?: boolean;
  message_id?: Id<"message">;
  message?: string;
  message_item?: MessageType;
} | null;

interface StoreInterface {
  deed: DeedType;
  setDeed: (d: DeedType) => void;
}

export const usePopupStore = create<StoreInterface>((set, get) => ({
  deed: null,
  setDeed: (d) => set({ deed: d }),
}));
