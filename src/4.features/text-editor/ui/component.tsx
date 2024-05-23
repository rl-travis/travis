import React, { useEffect, useState } from "react";

import { AddLink } from "./add-link";
import styles from "./text-editor.module.scss";
import { Editor, EditorState, Modifier, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import { Bold, Italic, Link2, Strikethrough } from "lucide-react";

import { useChatStore, useInter } from "@/6.shared";

export function TextEditor() {
  const { i18n } = useInter();
  const { setMessage, message, initialize, editorState, setEditorState } =
    useChatStore();

  const [hasSelection, setHasSelection] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (message) {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();

      let newContentState;

      if (hasSelection) {
        newContentState = Modifier.replaceText(currentContent, selection, message);
      } else {
        newContentState = Modifier.insertText(currentContent, selection, message);
      }

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "insert-characters",
      );
      setEditorState(newEditorState);
      setMessage("");
    }
  }, [message]);

  useEffect(() => {
    const selection = editorState.getSelection();
    setHasSelection(!selection.isCollapsed());
  }, [editorState]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onStrikeThroughClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  return (
    <div className={styles.wrapper}>
      {hasSelection && !isOpen && (
        <div className={styles.buttons}>
          <button onClick={onBoldClick} className={styles.button}>
            <Bold strokeWidth={2} size={16} className={styles.lucide} />
          </button>
          <button onClick={onItalicClick} className={styles.button}>
            <Italic strokeWidth={2} size={16} className={styles.lucide} />
          </button>
          <button onClick={onStrikeThroughClick} className={styles.button}>
            <Strikethrough strokeWidth={2} size={16} className={styles.lucide} />
          </button>

          <button onClick={() => setIsOpen(true)} className={styles.button}>
            <Link2 strokeWidth={2} size={16} className={styles.lucide} />
          </button>
        </div>
      )}
      {isOpen && <AddLink setIsOpen={setIsOpen} setHasSelection={setHasSelection} />}
      <div className={styles.editorWrapper}>
        <div className={styles.editor}>
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
            placeholder={i18n.chat.placeholder}
            editorKey="editor"
          />
        </div>
      </div>
    </div>
  );
}
