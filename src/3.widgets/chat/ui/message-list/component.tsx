import React from "react";
import styles from "./component.module.scss";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { SkeletonMessage } from "@/6.shared";
import { MessageItem } from "@/5.entities";
export function MessageList({ messages }: { messages: Doc<"message">[] | undefined }) {
  if (messages === undefined) {
    return (
      <div className={styles.wrapper}>
        <SkeletonMessage width={200} isGroup={false} isReply={false} />
        <SkeletonMessage width={200} isGroup={false} isReply={false} />
        <SkeletonMessage width={200} isGroup={false} isReply={true} />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      {messages.map((m) => {
        return <MessageItem message={m} key={m._id} />;
      })}
    </div>
  );
}
