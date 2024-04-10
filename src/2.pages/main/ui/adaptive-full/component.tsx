import React, { useCallback, useEffect, useState } from "react";
import styles from "./component.module.scss";
import { ArrowLeft, Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList, Settings } from "@/3.widgets";
import { IconLogo, useStore } from "@/6.shared";
import { ChatType, useUser, useUserAvatar } from "@/5.entities";
import { useResize } from "@/2.pages";
import { Chat } from "@/3.widgets/chat";
import classNames from "classnames/bind";
import { EditProfile, EditProfileType } from "@/4.features";

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

  const [isAccount, setIsAccount] = useState(false);

  const { chat, close, setUser } = useStore();

  const { edit, store: getUser } = useUser();
  const { add: addAvatar } = useUserAvatar();

  const keydownCallback = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  }, []);

  const onDone = async (p: EditProfileType) => {
    setIsAccount(false);
    await edit({
      user_id: user._id,
      username: p.username,
      name: p.name,
      about: p.about,
      locales: user.locales,
    });

    if (user.avatar_url[user.avatar_url.length - 1] !== p.avatar) {
      await addAvatar({
        url: p.avatar,
        user_id: user._id,
      });
    }

    const updatedUser = await getUser({ email: user.email });
    setUser(updatedUser);
  };

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
    setIsAccount(false);
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
            <ArrowLeft
              size={20}
              onClick={() => closeSettings()}
              className={styles.lucide}
            />
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
          {isOpenSettings && (
            <Settings isPending={isPending} setIsAccount={setIsAccount} />
          )}
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
      {isAccount && isOpenSettings && (
        <div className={styles.edit}>
          <EditProfile title={"Edit Profile"} done={onDone} />
        </div>
      )}
    </div>
  );
}
