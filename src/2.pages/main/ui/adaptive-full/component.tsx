import React, { useCallback, useEffect } from "react";

import classNames from "classnames/bind";

import styles from "./component.module.scss";

import { Doc } from "../../../../../convex/_generated/dataModel";

import { Header } from "./header";
import { Resize } from "./resize";

import { X } from "lucide-react";

import { Chat, ChatInfo, ChatList, Settings } from "@/3.widgets";

import { EditProfile, EditProfileType, LanguageInfo } from "@/4.features";

import { ChatType, useUser, useUserAvatar } from "@/5.entities";

import {
  Loading,
  useChatStore,
  useInter,
  useSettingsStore,
  useUserStore,
} from "@/6.shared";

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
  const { chat, setChat, openChatInfo, setOpenChatInfo } = useChatStore();
  const { i18n } = useInter();
  const { openSettings, menuSettings, setOpenSettings } = useSettingsStore();
  const { edit, store: getUser } = useUser();
  const { add: addAvatar } = useUserAvatar();

  const keydownCallback = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setChat(null);
      setOpenSettings(false);
    }
  }, []);

  const onDone = async (p: EditProfileType) => {
    setOpenSettings(false);

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
          <div
            className={cx(styles.stub, {
              stub__active: openChatInfo,
            })}
          />
          <div
            className={cx(styles.mini, {
              mini__active: openChatInfo,
            })}
          >
            <div className={styles.top}>
              <button className={styles.btn} onClick={() => setOpenChatInfo(false)}>
                <X size={20} />
              </button>
            </div>
            <ChatInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
