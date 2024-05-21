import { Doc } from "../../../../../convex/_generated/dataModel";

import s from "./adaptive-short.module.scss";
import { Footer } from "./footer";

import { Chat, ChatInfo, ChatList, Settings } from "@/3.widgets";

import { EditProfile, EditProfileType, LanguageInfo } from "@/4.features";

import { ChatType, useUser, useUserAvatar } from "@/5.entities";

import {
  Loading,
  soc,
  useChatStore,
  useInter,
  useSettingsStore,
  useShortStackStore,
  useUserStore,
} from "@/6.shared";

export function AdaptiveShort({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  const { chat, statusSidebar } = useChatStore();
  const { i18n } = useInter();
  const { setUser } = useUserStore();
  const { pop } = useShortStackStore();
  const { openSettings, menuSettings, setOpenSettings } = useSettingsStore();
  const { edit, store: getUser } = useUser();
  const { add: addAvatar } = useUserAvatar();
  const onDone = async (p: EditProfileType) => {
    // нахуя это здесь написано
    pop();
    pop();
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

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.list}>
          <ChatList chats={chats} user={user} />
        </div>
        <div className={soc(s.block, s.block__active, openSettings)}>
          <Settings />
        </div>
        <div className={soc(s.block, s.block__active, menuSettings === "profile")}>
          <div className={s.edit}>
            <EditProfile done={onDone} title={i18n.changeProfile.change} />
          </div>
        </div>
        <div className={soc(s.block, s.block__active, menuSettings === "language")}>
          <LanguageInfo />
        </div>
        <div className={soc(s.block, s.block__active, !!chat)}>
          {chat ? <Chat /> : <Loading />}
        </div>
        <div className={soc(s.block, s.block__active, statusSidebar === "info")}>
          <ChatInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
}
