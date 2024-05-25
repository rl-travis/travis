import cx from "classnames";

import { Doc } from "../../../../convex/_generated/dataModel";
import { reformatDateChats } from "../lib";

import styles from "./user-chat.module.scss";
import Image from "next/image";

import { Bookmark, Disc2, Pin, Rss, UsersRound } from "lucide-react";

import { ChatType } from "@/5.entities";

import { useInter, useShortStore, useChatStore } from "@/6.shared";

export function ChatListItem({
  current,
  user,
}: {
  current: ChatType;
  user: Doc<"user">;
}) {
  const { i18n } = useInter();
  const { add } = useShortStore();
  const { setChat, chat, clearNewMessages } = useChatStore();

  return (
    <div
      className={cx(styles.item, { [styles.active]: chat?._id === current._id })}
      onClick={() => {
        add("chat");
        setChat(current);
        clearNewMessages();
      }}
    >
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
