import React, { useCallback, useEffect, useState } from "react";
import styles from "./component.module.scss";
import { Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList } from "@/3.widgets";
import { IconLogo, SliderAvatar, useStore } from "@/6.shared";
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

  const keydownCallback = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  }, []);

  //обработчик события на кнопку Escape
  useEffect(() => {
    document.body.addEventListener("keydown", keydownCallback);
    return () => {
      document.body.removeEventListener("keydown", keydownCallback);
    };
  }, []);
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
          <SliderAvatar
            images={[
              "https://i.ibb.co/LrdFGb2/Frame-141.png",
              "https://i.ibb.co/y4gCFjD/Frame-142.png",
              "https://i.ibb.co/yB5MP0S/Frame-143.png",
              "https://i.ibb.co/19M3r4P/Frame-144.png",
            ]}
          />
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
      {chat && (
        <div className={styles.chat}>
          <Chat />
        </div>
      )}
    </div>
  );
}
