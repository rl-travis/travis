import React, { useEffect, useState } from "react";
import styles from "./component.module.scss";
import { Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList } from "@/3.widgets";
import { IconLogo, useStore } from "@/6.shared";
import { ChatType } from "@/5.entities";
import { useResize } from "@/2.pages";
import { Chat } from "@/3.widgets/chat";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const LeftRef = React.useRef<HTMLDivElement>(null);
  const { initResize, resetSize } = useResize(LeftRef, 500, 200, 300);

  const { chat, close } = useStore();

  //обработчик события на кнопку Escape
  useEffect(() => {
    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
      }
    });
    return () => {
      document.body.removeEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          close();
        }
      });
    };
  });

  /*
    состояние, которое отслеживает,
    меняем ли мы сейчас размер нашего sidebar с чатами
    нужно для того, чтобы при resize не учитывалось наведение на sidebar
    и не показывался scrollbar
    без этого были подёргивания при resize (scrollbar то появлялся, то исчезал)
  */

  const [isResizing, setIsResizing] = useState<boolean>(false);

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
        <div
          className={cx(styles.list, {
            scroll: !isResizing,
          })}
        >
          <ChatList chats={chats} user={user} />
        </div>
      </div>
      <div
        className={styles.resize}
        onDoubleClick={resetSize}
        onMouseDown={(event) => {
          initResize(event);
        }}
        onMouseOverCapture={() => {
          setIsResizing(true);
        }}
        onMouseOutCapture={() => {
          setIsResizing(false);
        }}
      />
      <div className={styles.chat}>{chat && <Chat />}</div>
    </div>
  );
}
