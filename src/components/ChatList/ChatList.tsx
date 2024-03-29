import React from "react";
import styles from "./ChatList.module.scss";
import ChatListItem from "@/components/ChatList/ChatListItem";
import { Doc } from "../../../convex/_generated/dataModel";
import { SkeletonChat } from "@/6.shared";
import { ChatType } from "@/5.entities";

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
        {Array.from({ length: 10 }, (_, i) => (
          <SkeletonChat key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      {chats.map((e) => {
        return <ChatListItem key={e._id} current={e} user={user} />;
      })}
    </div>
  );
}
