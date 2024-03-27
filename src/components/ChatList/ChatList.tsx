import React from "react";
import styles from "./ChatList.module.scss";
import { ChatType } from "@/types/interfaces/Chat";
import SkeletonChat from "@/components/Skeleton/SkeletonChat";
import ChatListItem from "@/components/ChatList/ChatListItem";
import { Doc } from "../../../convex/_generated/dataModel";

export default function ChatList({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  if (chats === undefined) {
    return (
      <div className={styles.wrapper}>
        {new Array(10)
          .map((_, i) => i)
          .map((e) => {
            return <SkeletonChat key={e} />;
          })}
      </div>
    );
  }
  console.log(chats);
  return (
    <div className={styles.wrapper}>
      {chats.map((e) => {
        return <ChatListItem key={e._id} current={e} user={user} />;
      })}
    </div>
  );
}
