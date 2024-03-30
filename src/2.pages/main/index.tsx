import { Doc } from "../../../convex/_generated/dataModel";
import { useUserChat } from "@/5.entities";
import { DevUsers } from "@/4.features/dev-users";
import AdaptiveShort from "@/3.widgets/adaptive-short/ui";
import AdaptiveFull from "@/3.widgets/adaptive-full/ui";

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
