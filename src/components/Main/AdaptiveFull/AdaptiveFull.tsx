import React from "react";
import styles from "./AdaptiveFull.module.scss";
import { ChatType } from "@/types/interfaces/Chat";
import ChatList from "@/components/ChatList/ChatList";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Bolt } from "lucide-react";
import useResize from "@/hooks/useResize";
import { signOut } from "next-auth/react";
import { IconLogo } from "@/6.shared";

export default function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const LeftRef = React.useRef<HTMLDivElement>(null);
  const { initResize, resetSize } = useResize(LeftRef, 500, 200, 300);
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
    </div>
  );
}
