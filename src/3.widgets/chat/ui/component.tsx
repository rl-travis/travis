import React from "react";
import styles from "./component.module.scss";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { BottomChat } from "./bottom-chat";
import { HeaderChat } from "./header-chat";

import { useStore } from "@/6.shared";
import { MessageList } from "@/3.widgets/chat/ui/message-list";

export function Chat() {
  const { chat } = useStore();

  const messages = useQuery(api.message.getAll, {
    chat_id: chat!.chat_id,
  });
  return (
    <div className={styles.wrapper}>
      <HeaderChat chat={chat!} />
      <div className={styles.main}>
        <div className={styles.center}>
          <div className={styles.list}>
            <MessageList messages={messages} />
          </div>
          <BottomChat />
        </div>
      </div>
    </div>
  );
}