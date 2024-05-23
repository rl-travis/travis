import styles from "./bottom-chat.module.scss";
import { convertToRaw, EditorState } from "draft-js";

import { LayoutGrid, SendHorizontal, Smile } from "lucide-react";

import { decorator, TextEditor } from "@/4.features";

import { useMessage } from "@/5.entities";

import { soc, useChatStore, useUserStore } from "@/6.shared";

export function BottomChat() {
  const { user } = useUserStore();
  const { chat, statusSidebar, setStatusSidebar, editorState, setEditorState } =
    useChatStore();
  const { send } = useMessage();

  function getMessageText(): string {
    return editorState.getCurrentContent().getPlainText();
  }

  function getMessageContent(): string {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    return JSON.stringify(rawContent);
  }

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
        onClick={async () => {
          if (getMessageText().length > 0) {
            await send({
              user_id: user!._id,
              chat_id: chat!.chat._id,
              value: getMessageContent(),
            });
            setEditorState(EditorState.createEmpty(decorator));
          }
        }}
      >
        <SendHorizontal />
      </button>
    </div>
  );
}
