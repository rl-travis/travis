"use client";

import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import cx from "classnames";

import { api } from "../../../../convex/_generated/api";

import styles from "./message.module.scss";
import { usePopupStore } from "@/6.shared/lib/store/popup";
import { useMutation } from "convex/react";
import Link from "next/link";
import { v4 as hash } from "uuid";

import { ArrowUpFromLine, Check, CheckCheck, Pencil, Pin } from "lucide-react";

import {
  BlockSendingInterface,
  MessageType,
  useMessage,
  reformatDateMessage,
  useFiles,
} from "@/5.entities";

import { calculateSizeFile, FileIcon, useUserStore } from "@/6.shared";

export const MessageItemSendingMemo = memo(MessageItemSending);
export function MessageItemSending({ message }: { message: BlockSendingInterface }) {
  const { send } = useMessage();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);
  const { uploadFile } = useFiles();
  const upload = async () => {
    const filesIds = await uploadFile(message.files);

    send({
      user_id: message.user,
      chat_id: message.chat,
      value: message.value,
      hash: message.hash,
      files: filesIds.map((e) => e._id),
      reply: message.reply?._id,
    }).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!user) return;
    upload();
  }, []);
  return (
    <div className={cx(styles.wrapper, styles.sender)} data-sending={true}>
      <div className={styles.message}>
        {message.reply && (
          <div className={styles.reply}>
            <div className={styles.tab} />
            <div className={styles.title}>{message.reply.user?.name}</div>
            <div className={styles.elem}>{message.reply.value}</div>
          </div>
        )}
        {message.files.length > 0 && (
          <div className={styles.files}>
            {message.files.map((f) => {
              return (
                <Link
                  key={hash()}
                  href={URL.createObjectURL(f)}
                  download={f.name}
                  className={styles.file}
                >
                  <FileIcon file={f} gray />
                  <div className={styles.content}>
                    <div className={styles.name}>{f.name}</div>
                    <div className={styles.size}>{calculateSizeFile(f.size)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className={styles.value}>{message.value}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.date}>{reformatDateMessage(message.date)}</div>
        {loading && (
          <div className={styles.sending}>
            <ArrowUpFromLine size={10} />
          </div>
        )}
      </div>
    </div>
  );
}

export function MessageItem({ message }: { message: MessageType }) {
  const { user } = useUserStore();
  const readMessage = useMutation(api.message.readMessage);
  const { ref, inView } = useInView({
    threshold: 0.7,
  });
  const { setDeed } = usePopupStore();

  useEffect(() => {
    if (user && inView && user._id !== message.user_id && !message.read) {
      readMessage({
        message_id: message._id,
      });
    }
  }, [inView]);

  if (!user) return "";

  return (
    <div
      ref={ref}
      className={cx(styles.wrapper, {
        [styles.recipient]: user._id !== message.user_id,
        [styles.sender]: user._id === message.user_id,
      })}
    >
      <div
        className={styles.message}
        onContextMenu={(e) => {
          e.preventDefault();
          setDeed({
            type: "message",
            x: e.pageX,
            y: e.pageY,
            message_id: message._id,
            message: message.value,
            pinned: message.pinned,
            message_item: message,
            // @ts-ignore
            width: e.view.innerWidth,
            // @ts-ignore
            height: e.view.innerHeight,
          });
        }}
      >
        {message.reply && (
          <div className={styles.reply}>
            <div className={styles.tab} />
            <div className={styles.title}>{message.reply.user?.name}</div>
            <div className={styles.elem}>{message.reply.message.value}</div>
          </div>
        )}
        {message.objects.length > 0 && (
          <div className={styles.files}>
            {message.objects.map((f) => {
              return (
                <Link
                  key={f._id}
                  href={f.url}
                  download={f.name}
                  className={styles.file}
                  target="_blank"
                >
                  <FileIcon object={f} gray={true} />
                  <div className={styles.content}>
                    <div className={styles.name}>{f.name}</div>
                    <div className={styles.size}>{calculateSizeFile(f.size)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <div className={styles.value}>{message.value}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.date}>{reformatDateMessage(message._creationTime)}</div>
        {message.pinned && <Pin size={10} />}
        {message.edited && <Pencil size={10} />}
        {message.read ? <CheckCheck size={10} /> : <Check size={10} />}
      </div>
    </div>
  );
}
