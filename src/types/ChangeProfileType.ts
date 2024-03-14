import { Id } from "../../convex/_generated/dataModel";

export type ChangeProfileType = {
  username: string;
  name: string;
  avatar_id: Id<"file"> | null;
  about: string;
  locales: number;
};
