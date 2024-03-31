import React from "react";
import styles from "./component.module.scss";
import { ChatList } from "@/3.widgets";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Bolt } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { IconLogo } from "@/6.shared";
import { ChatType } from "@/5.entities";
import { useResize } from "@/2.pages";

export function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const LeftRef = React.useRef<HTMLDivElement>(null);
  const { initResize, resetSize } = useResize(LeftRef, 500, 200, 300);

  const { update } = useSession();
  //функция для удаления сессии при выходе
  async function exit() {
    await update({
      user: null,
    });
    await signOut();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left} ref={LeftRef}>
        <div className={styles.header}>
          <div onClick={() => exit()}>
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
