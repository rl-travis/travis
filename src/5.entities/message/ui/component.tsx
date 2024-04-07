import React from "react";
import styles from "./component.module.scss";
import { Doc } from "../../../../convex/_generated/dataModel";
import reformatDateMessage from "@/5.entities/message/lib/reformat-date-message";
export function MessageItem({ message }: { message: Doc<"message"> }) {
  return (
    <div className={styles.wrapper}>
      {message.value}
      {reformatDateMessage(message._creationTime)}
    </div>
  );
}
