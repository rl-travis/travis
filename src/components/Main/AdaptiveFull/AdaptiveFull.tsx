import React from "react";
import styles from "./AdaptiveFull.module.scss";
import { ChatType } from "@/types/interfaces/Chat";
import ChatList from "@/components/ChatList/ChatList";
import { Doc } from "../../../../convex/_generated/dataModel";
import IconLogo from "@/components/Icon/IconLogo";
import { Bolt } from "lucide-react";
import Link from "next/link";

export default function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.header}>
          <IconLogo />
          <button className={styles.btn}>
            <Bolt size={20} />
          </button>
        </div>
        <div className={styles.list}>
          <ChatList chats={chats} user={user} />
        </div>
      </div>
    </div>
  );
}
