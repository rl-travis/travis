import { Doc } from "../../../../convex/_generated/dataModel";

import { AdaptiveShort } from "./adaptive-short";
import { AdaptiveFull } from "./adaptive-full";

import { DevUsers } from "@/4.features/dev-users";
import { useUserChat } from "@/5.entities";

export function MainPage({ user }: { user: Doc<"user"> }) {
  const { getChats: chats } = useUserChat(user);

  return (
    <>
      {chats && <DevUsers user={user} chats={chats} />}

      {navigator.maxTouchPoints > 0 ? (
        <AdaptiveShort chats={chats} user={user} />
      ) : (
        <AdaptiveFull chats={chats} user={user} />
      )}
    </>
  );
}
