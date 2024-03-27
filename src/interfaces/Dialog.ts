import { Doc, Id } from "../../convex/_generated/dataModel";
import { Chat } from "@/interfaces/Chat";

export interface Dialog extends Chat {
  chat_id: Id<"dialog">;
  type: "dialog";
  chat: {
    first_user_id: Id<"user">;
    second_user_id: Id<"user">;
    last_message_id?: Id<"message">;
    user: Doc<"user">;
    last_message: Doc<"message"> | null;
  };
}
