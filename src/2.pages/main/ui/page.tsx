import { Doc } from "../../../../convex/_generated/dataModel";
import { DevUsers } from "@/4.features/dev-users";
import { AdaptiveShort } from "@/2.pages";
import { AdaptiveFull } from "@/2.pages";
import { useUserChat } from "@/5.entities";

export function MainPage({ user }: { user: Doc<"user"> }) {
  const { getChats: chats } = useUserChat(user);

  return (
    <>
      {chats && <DevUsers user={user} chats={chats} />}

      {navigator.maxTouchPoints > 0 ? (
        <AdaptiveShort />
      ) : (
        <AdaptiveFull chats={chats} user={user} />
      )}
    </>
  );
}
