import styles from "./text-editor.module.scss";

import { useChatStore, useInter } from "@/6.shared";

export function TextEditor() {
  const { i18n } = useInter();
  const { setMessage, message } = useChatStore();
  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        value={message}
        placeholder={i18n.chat.placeholder}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
    </div>
  );
}
