import { Doc } from "../../../../convex/_generated/dataModel";

import { AdaptiveFull } from "./adaptive-full";
import { AdaptiveShort } from "./adaptive-short";

import { useUserChat } from "@/5.entities";

export function MainPage({ user }: { user: Doc<"user"> }) {
  const { getChats: chats } = useUserChat(user);

  return (
    <>
      {navigator.maxTouchPoints > 0 ? (
        <>{/*<AdaptiveShort chats={chats} user={user} />*/}</>
      ) : (
        <AdaptiveFull chats={chats} user={user} />
      )}
    </>
  );
}
