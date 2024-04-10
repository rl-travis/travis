import React, { useCallback, useEffect, useState } from "react";
import styles from "./component.module.scss";
import { ArrowLeft, Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList, Settings } from "@/3.widgets";
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

  const keydownCallback = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  }, []);

  useEffect(() => {
    document.body.addEventListener("keydown", keydownCallback);
    return () => {
      document.body.removeEventListener("keydown", keydownCallback);
    };
  }, []);

  const [isResizing, setIsResizing] = useState<boolean>(false);

  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);

  const [isPending, setIsPending] = useState<boolean>(false);

  function closeSettings() {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setIsOpenSettings(false);
    }, 150);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left} ref={LeftRef}>
        <div className={styles.header}>
          {isOpenSettings && !isPending && (
            <ArrowLeft size={20} onClick={() => closeSettings()} />
          )}
          <div onClick={() => signOut()}>
            <IconLogo />
          </div>
          <button className={styles.btn} onClick={() => setIsOpenSettings(true)}>
            <Bolt size={20} />
          </button>
        </div>
        <div
          className={cx(styles.list, {
            scroll: !isResizing,
          })}
        >
          {isOpenSettings && <Settings isPending={isPending} />}
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
