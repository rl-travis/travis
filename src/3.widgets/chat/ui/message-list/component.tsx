import React from "react";

import { Doc } from "../../../../../convex/_generated/dataModel";

import styles from "./message-list.module.scss";

import { MessageItem } from "@/5.entities";

import { SkeletonMessage } from "@/6.shared";

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
      {messages.map((message) => {
        return <MessageItem message={message} key={message._id} />;
      })}
    </div>
  );
}
