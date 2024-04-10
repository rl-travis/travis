import { Id } from "../../../../convex/_generated/dataModel";

export type ProfileInfoReturnType = {
  username: string | null;
  about: string | null;
  avatar_url: string[];
};

export type ProfileInfoParamsType = {
  doc: Id<"user"> | Id<"saved"> | Id<"group"> | Id<"channel">;
  type: "user" | "saved" | "group" | "channel";
};
