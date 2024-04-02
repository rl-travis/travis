import React from "react";
import styles from "./component.module.scss";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ChatType } from "@/5.entities";
import { HeaderChat } from "@/3.widgets/chat/ui/header-chat/component";

export function Chat({ chat }: { chat: ChatType }) {
  const messages = useQuery(api.message.getAll, {
    chat_id: chat.chat_id,
  });
  return (
    <div className={styles.wrapper}>
      <HeaderChat chat={chat} />
    </div>
  );
}
