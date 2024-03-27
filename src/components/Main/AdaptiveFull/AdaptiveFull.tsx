import React from "react";
import styles from "./AdaptiveFull.module.scss";
import { ChatType } from "@/types/interfaces/Chat";
import ChatList from "@/components/ChatList/ChatList";
import { Doc } from "../../../../convex/_generated/dataModel";

export default function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  return (
    <div className={styles.wrapper}>
      <ChatList chats={chats} user={user} />
    </div>
  );
}
