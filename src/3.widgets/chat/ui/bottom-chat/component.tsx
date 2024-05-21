import styles from "./bottom-chat.module.scss";

import { LayoutGrid, SendHorizontal, Smile } from "lucide-react";

import { TextEditor } from "@/4.features";

import { useMessage } from "@/5.entities";

import { soc, useChatStore, useUserStore } from "@/6.shared";

export function BottomChat() {
  const { user } = useUserStore();
  const { chat, message, setMessage, statusSidebar, setStatusSidebar } = useChatStore();
  const { send } = useMessage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <button
          className={soc(styles.btn, styles.btn__active, statusSidebar === "emoji")}
          onClick={() => {
            if (statusSidebar !== "emoji") {
              setStatusSidebar("emoji");
            } else {
              setStatusSidebar(null);
            }
          }}
        >
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
