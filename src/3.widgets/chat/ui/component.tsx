import React from "react";
import styles from "./component.module.scss";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { BottomChat } from "./bottom-chat";
import { HeaderChat } from "./header-chat";

import { useStore } from "@/6.shared";

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
          <div className={styles.list}>1</div>
          <BottomChat />
        </div>
      </div>
    </div>
  );
}
