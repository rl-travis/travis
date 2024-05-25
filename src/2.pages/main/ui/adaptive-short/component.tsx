import { useEffect } from "react";

import { Doc } from "../../../../../convex/_generated/dataModel";

import styles from "./adaptive-short.module.scss";
import { Footer } from "./footer";

import { Chat, ChatInfo, ChatList, Search, Settings } from "@/3.widgets";

import { EditProfile, EditProfileType, LanguageInfo } from "@/4.features";

import { ChatType, useUser, useUserAvatar } from "@/5.entities";

import {
  Loading,
  soc,
  useChatStore,
  useInter,
  useShortStore,
  useUserStore,
} from "@/6.shared";

export function AdaptiveShort({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const { chat } = useChatStore();
  const { i18n } = useInter();
  const { setUser } = useUserStore();
  const { pop, stack, isMobile } = useShortStore();
  const { edit, store: getUser } = useUser();
  const { add: addAvatar } = useUserAvatar();
  useEffect(() => {
    isMobile(true);
  }, []);
  const onDone = async (p: EditProfileType) => {
    pop();
    pop();
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.list}>
          <ChatList chats={chats} user={user} />
        </div>
        <div
          className={soc(
            styles.block,
            styles.block__active,
            stack.includes("settings"),
          )}
        >
          <Settings />
        </div>
        <div
          className={soc(
            styles.block,
            styles.block__active,
            stack.includes("settings_profile"),
          )}
        >
          <div className={styles.edit}>
            <EditProfile done={onDone} title={i18n.changeProfile.change} />
          </div>
        </div>
        <div
          className={soc(
            styles.block,
            styles.block__active,
            stack.includes("settings_language"),
          )}
        >
          <LanguageInfo />
        </div>
        <div
          className={soc(styles.block, styles.block__active, stack.includes("chat"))}
        >
          {chat ? <Chat /> : <Loading />}
        </div>
        <div
          className={soc(
            styles.block,
            styles.block__active,
            stack.includes("chat_info"),
          )}
        >
          <ChatInfo />
        </div>
        <div
          className={soc(styles.block, styles.block__active, stack.includes("search"))}
        >
          <Search chats={chats || []} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
