"use client";

import { useEffect, useState } from "react";

import cx from "classnames";

import styles from "./message.module.scss";
import reformatDateMessage from "@/5.entities/message/lib/reformat-date-message";

import { ArrowUpFromLine } from "lucide-react";

import { BlockSendingInterface, MessageType, useMessage } from "@/5.entities";

import { useUserStore } from "@/6.shared";

export function MessageItemSending({ message }: { message: BlockSendingInterface }) {
  const { send } = useMessage();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) return;
    // TODO вырезать hash
    send({
      user_id: message.user,
      chat_id: message.chat,
      value: message.value,
      hash: message.hash,
    }).then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <div className={cx(styles.wrapper, styles.sender)} data-sending={true}>
      <div className={styles.message}>{message.value}</div>
      <div className={styles.info}>
        {loading && (
          <div className={styles.sending}>
            <ArrowUpFromLine size={10} />
          </div>
        )}
        <div className={styles.date}>{reformatDateMessage(message.date.getTime())}</div>
      </div>
    </div>
  );
}

export function MessageItem({ message }: { message: MessageType }) {
  const { user } = useUserStore();
  if (!user) return "";

  // TODO потестить чужие сообщения
  return (
    <div
      className={cx(styles.wrapper, {
        [styles.recipient]: user._id !== message.user_id,
        [styles.sender]: user._id === message.user_id,
      })}
    >
      <div className={styles.message}>{message.value}</div>
      <div className={styles.info}>
        <div className={styles.date}>{reformatDateMessage(message._creationTime)}</div>
      </div>
    </div>
  );
}
