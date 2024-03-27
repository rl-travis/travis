import React from "react";
import styles from "./ChatList.module.scss";
import { ChatType } from "@/types/interfaces/Chat";
import Image from "next/image";
import { Disc2, Pin } from "lucide-react";
import reformatDateChats from "@/utils/reformatDateChats";
import { useInter } from "@/hooks/useInter";
import { Doc } from "../../../convex/_generated/dataModel";
export default function ChatListItem({
  current,
  user,
}: {
  current: ChatType;
  user: Doc<"user">;
}) {
  const { i18n } = useInter();
  return (
    <div className={styles.item}>
      <Image
        src={
          current.type === "dialog"
            ? current.chat.user.avatar_url
            : current.chat.avatar_url
        }
        alt="avatar"
        width={40}
        height={40}
        className={styles.avatar}
      />

      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.title}>
            {current.type === "dialog" ? current.chat.user.name : current.chat.name}
          </div>
          <div className={styles.info}>
            {current.pinned && <Pin size={12} />}
            {current.chat.last_message &&
              current.chat.last_message.user_id === user._id && <Disc2 size={12} />}
            {current.chat.last_message && (
              <div className={styles.date}>
                {reformatDateChats(current.chat.last_message._creationTime, i18n.slug)}
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.message}>
            {current.chat.last_message === null
              ? "История очищена"
              : current.chat.last_message.value}
          </div>
          {current.unread > 0 && <div className={styles.unread}>{current.unread}</div>}
        </div>
      </div>
    </div>
  );
}
