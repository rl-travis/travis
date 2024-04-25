import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

import { useQuery } from "convex/react";

export function useUserChat(user: Doc<"user">) {
  const getChats = useQuery(api.user_chat.getChats, { user_id: user._id });
  return { getChats };
}
