import { Id } from "../../convex/_generated/dataModel";

export interface Chat {
  user_id: Id<"user">;
  chat_id: Id<"dialog"> | Id<"group"> | Id<"channel"> | Id<"saved">;
  unread: number;
  type: "dialog" | "group" | "channel" | "saved";
  pinned: boolean;
}
