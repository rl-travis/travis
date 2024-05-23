import { Dispatch, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./link-portal.module.scss";

import { addLink } from "@/4.features";

import { useChatStore } from "@/6.shared";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkPortal = (props: Props) => {
  const { setIsOpen } = props;

  const [url, setUrl] = useState<string>("");

  const { editorState, setEditorState } = useChatStore();

  const onAddLinkClick = () => {
    if (url) {
      setEditorState(addLink(editorState, url));
    }
    setUrl("");
    setIsOpen(false);
  };

  return createPortal(
    <div className={styles.wrapper} onClick={() => setIsOpen(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <span className={styles.title}>Введите URL</span>
        <label htmlFor="url" className={styles.label}>
          <input
            type="url"
            id={"url"}
            onChange={(e) => setUrl(e.currentTarget.value)}
            className={styles.input}
            placeholder={"Введите url"}
            autoComplete={"off"}
          />
        </label>
        <button onClick={() => onAddLinkClick()} className={styles.button}>
          Добавить URL
        </button>
      </div>
    </div>,
    document.body,
  );
};
