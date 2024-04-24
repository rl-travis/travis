import React from "react";
import styles from "./component.module.scss";

import { BottomChat } from "./bottom-chat";
import { HeaderChat } from "./header-chat";

import { useStore } from "@/6.shared";
import { MessageList } from "@/3.widgets/chat/ui/message-list";
import { useMessageList } from "@/5.entities";

export function Chat() {
  const { chat } = useStore();

  const { messages } = useMessageList(chat!.chat_id);
  return (
    <div className={styles.wrapper}>
      <HeaderChat chat={chat!} />
      <div className={styles.main}>
        <div className={styles.center}>
          <div className={styles.list}>
            {/*здесь пагинация идёт рабочая уже*/}
            <MessageList messages={messages} />
          </div>
          <BottomChat />
        </div>
      </div>
    </div>
  );
}
