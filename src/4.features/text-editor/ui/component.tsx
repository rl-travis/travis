import React, { useState, useEffect } from "react";

import styles from "./text-editor.module.scss";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  Modifier,
  CompositeDecorator,
  ContentBlock,
} from "draft-js";
import "draft-js/dist/Draft.css";

import { useChatStore, useInter } from "@/6.shared";

// Стратегия поиска ссылок в содержимом
const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
};

// Компонент для отображения ссылок
const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ textDecoration: "underline", color: "blue" }}>
      {props.children}
    </a>
  );
};

// Декоратор для обработки ссылок
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

// Функция для добавления ссылки
const addLink = (editorState: EditorState, url: string): EditorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const contentStateWithLink = Modifier.applyEntity(
    contentStateWithEntity,
    selectionState,
    entityKey,
  );

  const newEditorState = EditorState.push(
    editorState,
    contentStateWithLink,
    "apply-entity",
  );

  return EditorState.forceSelection(newEditorState, selectionState);
};

export function TextEditor() {
  const { i18n } = useInter();
  const { setMessage, message } = useChatStore();

  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText(message || "");
    return EditorState.createWithContent(contentState, decorator);
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

  const onStrikeThroughClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const onAddLinkClick = () => {
    const url = prompt("Enter a URL:");
    if (url) {
      setEditorState(addLink(editorState, url));
    }
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
      <button onClick={onStrikeThroughClick}>Зачеркнуть</button>
      <button onClick={logContent}>Content</button>
      <button onClick={onAddLinkClick}>Add link</button>

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
