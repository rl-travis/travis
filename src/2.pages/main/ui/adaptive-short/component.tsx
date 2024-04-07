import React from "react";
import styles from "./component.module.scss";
import { ArrowLeftFromLine, Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList } from "@/3.widgets";
import { IconLogo, useStore } from "@/6.shared";
import { ChatType } from "@/5.entities";
import { Chat } from "@/3.widgets/chat";

export function AdaptiveShort({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const { chat, close } = useStore();
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <ChatList chats={chats} user={user} />
        {chat && (
          <div className={styles.chat}>
            <Chat />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        {chat && (
          <button className={styles.btn} onClick={() => close()}>
            <ArrowLeftFromLine size={20} />
          </button>
        )}

        <div onClick={() => signOut()}>
          <IconLogo />
        </div>
        <button className={styles.btn}>
          <Bolt size={20} />
        </button>
      </div>
    </div>
  );
}
