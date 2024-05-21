import React from "react";

import { BottomChat } from "./bottom-chat";
import styles from "./chat.module.scss";
import { HeaderChat } from "./header-chat";

import { useChatStore } from "@/6.shared";

export function Chat() {
  const { chat } = useChatStore();
  // const { messages } = useMessageList(chat!.chat_id);
  return (
    <div className={styles.wrapper}>
      <HeaderChat chat={chat!} />
      <div className={styles.main}>
        <div className={styles.center}>
          <div className={styles.list}>
            {/*здесь пагинация идёт рабочая уже*/}
            {/*<MessageList messages={messages} />*/}
          </div>
          <BottomChat />
        </div>
      </div>
    </div>
  );
}
