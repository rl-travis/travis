import { Doc } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DevUsers from "@/components/DevUsers/DevUsers";
import AdaptiveShort from "@/components/Main/AdaptiveShort/AdaptiveShort";
import AdaptiveFull from "@/components/Main/AdaptiveFull/AdaptiveFull";

export default function Main({ user }: { user: Doc<"user"> }) {
  const chats = useQuery(api.user_chat.getChats, {
    user_id: user._id,
  });
  return (
    <>
      {chats && <DevUsers user={user} chats={chats} />}

      {navigator.maxTouchPoints > 0 ? <AdaptiveShort /> : <AdaptiveFull />}
    </>
  );
}
