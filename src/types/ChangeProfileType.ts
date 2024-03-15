import { Doc } from "../../convex/_generated/dataModel";

export type ChangeProfileType = {
  username: string;
  name: string;
  avatarDoc: Doc<"file"> | null;
  about: string;
};
