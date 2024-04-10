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
              "https://elegant-hedgehog-865.convex.cloud/api/storage/e3eced81-3b8d-4a96-ac89-dabb82f6f525",
              "https://elegant-hedgehog-865.convex.cloud/api/storage/58e57f7e-5ec5-42a0-9dc1-9c569228e4ea",
              "https://elegant-hedgehog-865.convex.cloud/api/storage/6d152636-dc57-4957-959c-559f507f834b",
              "https://elegant-hedgehog-865.convex.cloud/api/storage/c1512587-7741-4c7c-8816-96cf9a36b2ed",
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
