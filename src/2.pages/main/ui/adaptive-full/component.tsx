import React, { useCallback, useEffect, useState } from "react";
import styles from "./component.module.scss";
import { Doc } from "../../../../../convex/_generated/dataModel";

import {
  Loading,
  useChatStore,
  useInter,
  useSettingsStore,
  useUserStore,
} from "@/6.shared";
import { ChatType, useUser, useUserAvatar } from "@/5.entities";
import { Chat } from "@/3.widgets/chat";
import classNames from "classnames/bind";
import { EditProfile, EditProfileType } from "@/4.features";
import { Header } from "./header";
import { Resize } from "./resize";
import { ChatList, Settings } from "@/3.widgets";
import { LanguageInfo } from "@/4.features/language";

const cx = classNames.bind(styles);

export function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const leftRef = React.useRef<HTMLDivElement>(null);

  const { setUser } = useUserStore();
  const { chat, setChat } = useChatStore();
  const { i18n } = useInter();

  const { openSettings, menuSettings, setOpenSettings } = useSettingsStore();
  const { edit, store: getUser } = useUser();
  const { add: addAvatar } = useUserAvatar();

  const [isPending, setIsPending] = useState<boolean>(false);

  const keydownCallback = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setChat(null);
      setOpenSettings(false);
    }
  }, []);

  const onDone = async (p: EditProfileType) => {
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.left} ref={leftRef}>
        <Header />
        <div className={styles.left__content}>
          <div
            className={cx(styles.settings, {
              settings__active: openSettings,
            })}
          >
            <Settings />
          </div>
          <div className={styles.list}>
            <ChatList chats={chats} user={user} />
          </div>
        </div>
      </div>
      {leftRef.current !== null && <Resize leftRef={leftRef} />}
      <div className={styles.right}>
        <div
          className={cx(styles.block, {
            block__active: menuSettings === "profile",
          })}
        >
          <EditProfile done={onDone} title={i18n.changeProfile.change} />
        </div>
        <div
          className={cx(styles.block, {
            block__active: menuSettings === "language",
          })}
        >
          <LanguageInfo />
        </div>
        <div
          className={cx(styles.block, {
            block__active: !!chat,
          })}
        >
          {chat ? <Chat /> : <Loading />}
        </div>
      </div>
    </div>
  );
}
