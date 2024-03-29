import { Doc } from "../../../convex/_generated/dataModel";
import DevUsers from "@/components/DevUsers/DevUsers";
import AdaptiveShort from "@/components/Main/AdaptiveShort/AdaptiveShort";
import AdaptiveFull from "@/components/Main/AdaptiveFull/AdaptiveFull";
import { useUserChat } from "@/5.entities";

export default function Main({ user }: { user: Doc<"user"> }) {
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
