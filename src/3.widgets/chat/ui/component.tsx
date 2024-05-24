import React from "react";

import { BottomChat } from "./bottom-chat";
import styles from "./chat.module.scss";
import { HeaderChat } from "./header-chat";
import { MessageList } from "@/3.widgets/chat/ui/message-list";

import { useChatStore } from "@/6.shared";

export function Chat() {
  const { chat } = useChatStore();
  //
  return (
    <div className={styles.wrapper}>
      <HeaderChat chat={chat!} />
      <div className={styles.main}>
        <div className={styles.center}>
          <MessageList chat={chat!} />
          <BottomChat />
        </div>
      </div>
    </div>
  );
}
