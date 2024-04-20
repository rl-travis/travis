import { Id } from "../../../../convex/_generated/dataModel";

export type ProfileInfoReturnType = {
  username?: string | null;
  name: string | null;
  about: string | null;
  avatar_urls: string[];
};

export type ProfileInfoParamsType = {
  doc: Id<"user"> | Id<"saved"> | Id<"group"> | Id<"channel">;
  type: "user" | "saved" | "group" | "channel";
};
