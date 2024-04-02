import React from "react";
import styles from "./component.module.scss";
import { Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList } from "@/3.widgets";
import { IconLogo } from "@/6.shared";
import { ChatType } from "@/5.entities";
import { useResize } from "@/2.pages";
import { useStore } from "@/app/_store/zustand";
import { Chat } from "@/3.widgets/chat";

export function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const LeftRef = React.useRef<HTMLDivElement>(null);
  const { initResize, resetSize } = useResize(LeftRef, 500, 200, 300);

  const { chat } = useStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.left} ref={LeftRef}>
        <div className={styles.header}>
          <div onClick={() => signOut()}>
            <IconLogo />
          </div>
          <button className={styles.btn}>
            <Bolt size={20} />
          </button>
        </div>
        <div className={styles.list}>
          <ChatList chats={chats} user={user} />
        </div>
      </div>
      <div
        className={styles.resize}
        onDoubleClick={resetSize}
        onMouseDown={initResize}
      />
      <div className={styles.chat}>{chat && <Chat chat={chat} />}</div>
    </div>
  );
}
