import { Dispatch, SetStateAction, useState } from "react";

import styles from "./add-link.module.scss";

import { Check } from "lucide-react";

import { addLink } from "@/4.features";

import { useChatStore } from "@/6.shared";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setHasSelection: Dispatch<SetStateAction<boolean>>;
}

export const AddLink = (props: Props) => {
  const { setIsOpen, setHasSelection } = props;

  const [url, setUrl] = useState<string>("");

  const { editorState, setEditorState } = useChatStore();

  const onAddLinkClick = () => {
    if (url) {
      setEditorState(addLink(editorState, url));
    }
    setUrl("");
    setIsOpen(false);
    setHasSelection(false);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="url" className={styles.label}>
        <input
          type="url"
          id={"url"}
          onChange={(e) => setUrl(e.currentTarget.value)}
          className={styles.input}
          placeholder={"Enter URL..."}
          autoComplete={"off"}
        />
        <button onClick={() => onAddLinkClick()} className={styles.button}>
          <Check size={20} className={styles.lucide} />
        </button>
      </label>
    </div>
  );
};
