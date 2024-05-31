import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

import styles from "./PinnedMessages.module.scss";
import { useQuery } from "convex/react";

import { reformatDateMessage } from "@/5.entities";

import { useInter } from "@/6.shared";

export function PinnedMessages({ chat_id }: { chat_id: Id<"dialog"> | Id<"saved"> }) {
  const pinned = useQuery(api.message.getAllPinned, {
    chat_id,
  });
  const { i18n } = useInter();
  if (!pinned) return "";
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>{i18n.chat.pinned}</div>
      {pinned.map((e) => {
        return (
          <div key={e._id} className={styles.message}>
            <div className={styles.value}>{e.value}</div>
            <div className={styles.date}>{reformatDateMessage(e._creationTime)}</div>
          </div>
        );
      })}
    </div>
  );
}
