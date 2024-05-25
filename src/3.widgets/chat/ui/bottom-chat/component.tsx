import styles from "./bottom-chat.module.scss";
import { v4 as hash } from "uuid";

import { LayoutGrid, SendHorizontal, Smile } from "lucide-react";

import { TextEditor } from "@/4.features";

import { useMessage } from "@/5.entities";

import { soc, useChatStore, useUserStore } from "@/6.shared";

export function BottomChat() {
  const { user } = useUserStore();
  const { chat, statusSidebar, setStatusSidebar, message, setMessage, addNewMessages } =
    useChatStore();
  const { send } = useMessage();

  const sendMessage = async () => {
    if (message.length > 0) {
      addNewMessages({
        chat: chat!._id,
        value: message,
        hash: hash(),
        date: new Date(),
        user_id: user!._id,
        chat_id: chat!.chat_id,
      });
      setMessage("");
    }
  };

  return (
    <div
      className={styles.wrapper}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sendMessage();
        }
      }}
    >
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
      <button className={styles.send} onClick={sendMessage}>
        <SendHorizontal />
      </button>
    </div>
  );
}
