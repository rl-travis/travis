import React, { useState, useEffect } from "react";

import styles from "./text-editor.module.scss";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";

import { useChatStore, useInter } from "@/6.shared";

export function TextEditor() {
  const { i18n } = useInter();
  const { setMessage, message } = useChatStore();

  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText(message || "");
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const newContentState = Modifier.insertText(
      currentContent,
      selection,
      message || "",
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters",
    );
    setEditorState(newEditorState);
    setMessage("");
  }, [message]);

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

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const logContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    console.log("Editor content:", rawContent);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={onBoldClick}>Bold</button>
      <button onClick={onItalicClick}>Italic</button>
      <button onClick={onUnderlineClick}>Underline</button>
      <button onClick={logContent}>Content</button>

      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        handleKeyCommand={handleKeyCommand}
        placeholder={i18n.chat.placeholder}
        editorKey="editor"
      />
    </div>
  );
}
