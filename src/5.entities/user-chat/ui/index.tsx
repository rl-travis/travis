import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { Bookmark, Disc2, Pin, Rss, UsersRound } from "lucide-react";

import { Doc } from "../../../../convex/_generated/dataModel";
import { useInter } from "@/6.shared";
import { ChatType } from "@/5.entities";
import { reformatDateChats } from "../lib";
import { useStore } from "@/6.shared";

export function ChatListItem({
  current,
  user,
}: {
  current: ChatType;
  user: Doc<"user">;
}) {
  const { i18n } = useInter();

  const { open } = useStore();

  return (
    <div className={styles.item} onClick={() => open(current)}>
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
          {current.type === "saved" ? (
            <Bookmark size={12} />
          ) : current.type === "group" ? (
            <UsersRound size={12} />
          ) : current.type === "channel" ? (
            <Rss size={12} />
          ) : (
            ""
          )}
          <h3 className={styles.title}>
            {current.type === "dialog" ? current.chat.user.name : current.chat.name}
          </h3>
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
