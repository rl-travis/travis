import React from "react";
import styles from "./component.module.scss";
import { LayoutGrid, SendHorizontal, Smile } from "lucide-react";

import { TextEditor } from "@/4.features";
import { useChatStore, useUserStore } from "@/6.shared";
import { useMessage } from "@/5.entities";

export function BottomChat() {
  const { user } = useUserStore();
  const { chat, message, setMessage } = useChatStore();
  const { send } = useMessage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <button className={styles.btn}>
          <Smile size={20} />
        </button>
        <button className={styles.btn}>
          <LayoutGrid size={20} />
        </button>
      </div>
      <TextEditor />
      <button
        className={styles.send}
        onClick={() => {
          if (message.length > 0) {
            send({
              user_id: user!._id,
              chat_id: chat!.chat._id,
              value: message,
            });
            setMessage("");
          }
        }}
      >
        <SendHorizontal />
      </button>
    </div>
  );
}
