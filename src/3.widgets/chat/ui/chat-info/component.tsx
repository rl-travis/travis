import styles from "./chat-info.module.scss";

import { ProfileInfo } from "@/4.features";

import { useChatStore } from "@/6.shared";

export function ChatInfo() {
  const { chat } = useChatStore();
  if (!chat) {
    return "";
  }
  return (
    <div className={styles.wrapper}>
      <ProfileInfo
        doc={chat.type === "dialog" ? chat.chat.user._id : chat.chat._id}
        type={chat.type === "dialog" ? "user" : chat.type}
      />
    </div>
  );
}
