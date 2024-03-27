import { Doc, Id } from "../../convex/_generated/dataModel";
import { Chat } from "@/interfaces/Chat";

export interface Group extends Chat {
  chat_id: Id<"group">;
  type: "group";
  chat: {
    avatar_url: string;
    about: string;
    name: string;
    last_message_id?: Id<"message">;
    last_message: Doc<"message"> | null;
  };
}
