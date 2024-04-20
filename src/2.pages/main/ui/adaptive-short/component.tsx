import React, { useState } from "react";
import styles from "./component.module.scss";
import { ArrowLeft, ArrowLeftFromLine, Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList, Settings } from "@/3.widgets";
import { IconLogo, useSettingsStore, useStore } from "@/6.shared";
import { ChatType } from "@/5.entities";
import { Chat } from "@/3.widgets";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function AdaptiveShort({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const { chat, close } = useStore();

  const { reset: resetSettings } = useSettingsStore();

  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);

  const [isPending, setIsPending] = useState<boolean>(false);

  function closeSettings() {
    setIsPending(true);
    resetSettings();
    setTimeout(() => {
      setIsPending(false);
      setIsOpenSettings(false);
    }, 150);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {isOpenSettings && <Settings isPending={isPending} />}
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

        {isOpenSettings && !isPending && (
          <button onClick={() => closeSettings()} className={styles.btn}>
            <ArrowLeft size={20} />
          </button>
        )}
        <div onClick={() => signOut()}>
          <IconLogo />
        </div>
        <button
          className={cx(styles.btn, {
            active: isOpenSettings && !isPending,
          })}
          onClick={() => setIsOpenSettings(true)}
        >
          <Bolt size={20} />
        </button>
      </div>
    </div>
  );
}
