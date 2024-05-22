import { useCallback, useEffect, useRef } from "react";

import { Doc } from "../../../../../convex/_generated/dataModel";

import styles from "./adaptive-full.module.scss";
import { Header } from "./header";
import { Resize } from "./resize";
import { SidebarTop } from "./sidebar-top";

import { Chat, ChatInfo, ChatList, EmojiList, Settings } from "@/3.widgets";

import { EditProfile, EditProfileType, LanguageInfo } from "@/4.features";

import { ChatType, useUser, useUserAvatar } from "@/5.entities";

import {
  Loading,
  soc,
  useChatStore,
  useInter,
  useSettingsStore,
  useUserStore,
} from "@/6.shared";

export function AdaptiveFull({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const leftRef = useRef<HTMLDivElement>(null);

  const { setUser } = useUserStore();
  const { chat, setChat, statusSidebar } = useChatStore();
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
          <div className={soc(styles.settings, styles.settings__active, openSettings)}>
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
          className={soc(
            styles.block,
            styles.block__active,
            menuSettings === "profile",
          )}
        >
          <EditProfile done={onDone} title={i18n.changeProfile.change} />
        </div>
        <div
          className={soc(
            styles.block,
            styles.block__active,
            menuSettings === "language",
          )}
        >
          <LanguageInfo />
        </div>
        <div className={soc(styles.block, styles.block__active, !!chat)}>
          {chat ? <Chat /> : <Loading />}
          <div className={soc(styles.stub, styles.stub__active, !!statusSidebar)} />
          <div
            className={soc(styles.mini, styles.mini__active, statusSidebar === "info")}
          >
            <SidebarTop />
            <ChatInfo />
          </div>
          <div
            className={soc(styles.mini, styles.mini__active, statusSidebar === "emoji")}
          >
            <SidebarTop emoji />
            <EmojiList />
          </div>
        </div>
      </div>
    </div>
  );
}
