import React from "react";

import styles from "./component.module.scss";

import { useChatStore, useInter } from "@/6.shared";

export function TextEditor() {
  const { i18n } = useInter();
  const { setMessage } = useChatStore();
  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        placeholder={i18n.chat.placeholder}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
    </div>
  );
}
