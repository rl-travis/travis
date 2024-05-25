import { Doc, Id } from "../../../../convex/_generated/dataModel";

export type MessageType = {
  user:
    | {
        _id: Id<"user">;
        _creationTime: number;
        name: string;
        email: string;
        username: string;
        about: string;
        locales: number;
        avatar_url: string;
      }
    | null
    | undefined;
  _id: Id<"message">;
  value: string;
  user_id: Id<"user">;
  chat_id: Id<"dialog"> | Id<"group"> | Id<"channel"> | Id<"saved">;
  edited: boolean;
  reply_id?: Id<"message">;
  forward: boolean;
  objects: Doc<"file">[];
  files: Id<"file">[];
  hash: string;
  _creationTime: number;
};

export type NewMessageType = {
  value: string;
  hash: string;
  chat: Id<"user_chat">;
  chat_id: Id<"dialog"> | Id<"group"> | Id<"channel"> | Id<"saved">;
  user_id: Id<"user">;
  date: Date;
  files: File[];
};

export interface BlockInterface {
  type: "date" | "sending" | "initial";
  date: number;
}
export interface BlockInitialInterface extends BlockInterface {
  type: "initial";
  m: MessageType;
  h: string;
}

export interface BlockDateInterface extends BlockInterface {
  type: "date";
  d: string;
  h: string;
}

export interface BlockSendingInterface extends BlockInterface {
  type: "sending";
  value: string;
  hash: string;
  user: Id<"user">;
  chat: Id<"dialog"> | Id<"group"> | Id<"channel"> | Id<"saved">;
  files: File[];
}

export type BlockType =
  | BlockInitialInterface
  | BlockDateInterface
  | BlockSendingInterface;
