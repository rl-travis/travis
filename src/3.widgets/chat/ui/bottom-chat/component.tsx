"use client";

import { useState } from "react";

import styles from "./bottom-chat.module.scss";
import { v4 as hash } from "uuid";

import { Paperclip, SendHorizontal, Smile, Trash } from "lucide-react";

import { TextEditor } from "@/4.features";

import {
  calculateSizeFile,
  FileIcon,
  soc,
  useChatStore,
  useUserStore,
} from "@/6.shared";

export function BottomChat() {
  const [files, setFiles] = useState<{ file: File; h: string }[]>([]);
  const { user } = useUserStore();
  const { chat, statusSidebar, setStatusSidebar, message, setMessage, addNewMessages } =
    useChatStore();

  const sendMessage = async () => {
    if (message.length > 0 || files.length > 0) {
      addNewMessages({
        chat: chat!._id,
        value: message,
        hash: hash(),
        date: new Date(),
        user_id: user!._id,
        chat_id: chat!.chat_id,
        files: files.map((e) => e.file),
      });
      setFiles([]);
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
      <div className={soc(styles.files, styles.files__active, files.length > 0)}>
        {files.map((f, i) => {
          return (
            <div key={f.h} className={styles.file}>
              <FileIcon file={f.file} gray={false} />
              <div className={styles.info}>
                <div className={styles.name}>{f.file.name}</div>
                <div className={styles.size}>{calculateSizeFile(f.file.size)}</div>
              </div>
              <button
                className={styles.delete}
                onClick={() => {
                  setFiles((prev) => {
                    const buffer = [...prev];
                    buffer.splice(i, 1);
                    return buffer;
                  });
                }}
              >
                <Trash size={16} />
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.left}>
        <button
          className={soc(styles.emoji, styles.emoji__active, statusSidebar === "emoji")}
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

        <label htmlFor="files" className={styles.btn}>
          <Paperclip size={20} />
        </label>
        <input
          type="file"
          multiple
          id="files"
          className={styles.input}
          onChange={(e) =>
            setFiles((prev) => [
              ...prev,
              ...Array.from(e.target.files || []).map((e) => {
                return {
                  file: e,
                  h: hash(),
                };
              }),
            ])
          }
        />
      </div>
      <TextEditor />
      <button className={styles.send} onClick={sendMessage}>
        <SendHorizontal />
      </button>
    </div>
  );
}
