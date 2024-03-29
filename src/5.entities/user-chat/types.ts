import { Doc, Id } from "../../../convex/_generated/dataModel";

export type ChatType =
  | GroupInterface
  | ChannelInterface
  | DialogInterface
  | SavedInterface;
export interface ChatBase {
  _id: Id<"user_chat">;
  user_id: Id<"user">;
  chat_id: Id<"dialog"> | Id<"group"> | Id<"channel"> | Id<"saved">;
  unread: number;
  type: "dialog" | "group" | "channel" | "saved";
  pinned: boolean;
  _creationTime: number;
}

export interface GroupInterface extends ChatBase {
  chat_id: Id<"group">;
  type: "group";
  chat: {
    _id: Id<"group">;
    _creationTime: number;
    avatar_url: string;
    about: string;
    name: string;
    last_message_id?: Id<"message">;
    last_message: Doc<"message"> | null;
  };
}

export interface SavedInterface extends ChatBase {
  chat_id: Id<"saved">;
  type: "saved";
  chat: {
    _id: Id<"saved">;
    _creationTime: number;
    avatar_url: string;
    name: string;
    last_message_id?: Id<"message">;
    last_message: Doc<"message"> | null;
  };
}

export interface ChannelInterface extends ChatBase {
  chat_id: Id<"channel">;
  type: "channel";
  chat: {
    _id: Id<"channel">;
    _creationTime: number;
    avatar_url: string;
    about: string;
    name: string;
    last_message_id?: Id<"message">;
    last_message: Doc<"message"> | null;
  };
}
export interface DialogInterface extends ChatBase {
  chat_id: Id<"dialog">;
  type: "dialog";
  chat: {
    _id: Id<"dialog">;
    _creationTime: number;
    first_user_id: Id<"user">;
    second_user_id: Id<"user">;
    last_message_id?: Id<"message">;
    user: Doc<"user">;
    last_message: Doc<"message"> | null;
  };
}
