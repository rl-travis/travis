import React from "react";

import { Doc } from "../../../../convex/_generated/dataModel";

import styles from "./message.module.scss";
import reformatDateMessage from "@/5.entities/message/lib/reformat-date-message";

export function MessageItem({ message }: { message: Doc<"message"> }) {
  return (
    <div className={styles.wrapper}>
      {message.value}
      {reformatDateMessage(message._creationTime)}
    </div>
  );
}
