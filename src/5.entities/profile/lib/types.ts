import { Id } from "../../../../convex/_generated/dataModel";

export type ProfileInfoReturnType = {
  username?: string;
  name: string;
  about: string;
  avatar_urls: string[];
};

export type ProfileInfoParamsType = {
  doc: Id<"user"> | Id<"saved"> | Id<"group"> | Id<"channel">;
  type: "user" | "saved" | "group" | "channel";
};
