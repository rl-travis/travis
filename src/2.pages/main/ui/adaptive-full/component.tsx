import React, { useCallback, useEffect, useState } from "react";
import styles from "./component.module.scss";
import { ArrowLeft, Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList, Settings } from "@/3.widgets";
import { IconLogo, useInter, useSettingsStore, useStore } from "@/6.shared";
import { ChatType, useUser, useUserAvatar } from "@/5.entities";
import { useResize } from "@/2.pages";
import { Chat } from "@/3.widgets/chat";
import classNames from "classnames/bind";
import { EditProfile, EditProfileType } from "@/4.features";
import { LanguageInfo } from "@/4.features/language";

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

  const { chat, close, setUser } = useStore();

  const {
    isProfile,
    reset: resetSettings,
    closeProfile,
    open: openSettings,
    isOpen: isOpenSettings,
    close: closeSettings,
    isLanguage,
  } = useSettingsStore();

  const { i18n } = useInter();

  const { edit, store: getUser } = useUser();
  const { add: addAvatar } = useUserAvatar();

  const [isResizing, setIsResizing] = useState<boolean>(false);

  const [isPending, setIsPending] = useState<boolean>(false);

  const keydownCallback = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      close();
      closeSettings();
    }
  }, []);

  const onDone = async (p: EditProfileType) => {
    closeProfile();
    closeSettings();
    await edit({
      user_id: user._id,
      username: p.username,
      name: p.name,
      about: p.about,
      locales: user.locales,
    });

    if (user.avatar_url !== p.avatar) {
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

  function closeSettingsWithAnimation() {
    setIsPending(true);
    resetSettings();
    setTimeout(() => {
      setIsPending(false);
      closeSettings();
    }, 150);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left} ref={LeftRef}>
        <div className={styles.header}>
          {isOpenSettings && !isPending && (
            <button className={styles.btn} onClick={() => closeSettingsWithAnimation()}>
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
            onClick={() => openSettings()}
          >
            <Bolt size={20} />
          </button>
        </div>
        {(!isOpenSettings || isPending) && (
          <div
            className={cx(styles.list, {
              scroll: !isResizing,
            })}
          >
            <ChatList chats={chats} user={user} />
          </div>
        )}
        {isOpenSettings && (
          <div className={styles.settings}>
            <Settings isPending={isPending} />
          </div>
        )}
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
      {isProfile && isOpenSettings && (
        <div className={styles.edit}>
          <EditProfile title={i18n.changeProfile.change} done={onDone} />
        </div>
      )}
      {isLanguage && <LanguageInfo />}
    </div>
  );
}
