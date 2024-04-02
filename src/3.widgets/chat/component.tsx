import React from "react";
import styles from "./component.module.scss";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { HeaderChat } from "@/3.widgets/chat/ui/header-chat/component";
import { useStore } from "@/6.shared/lib/store/zustand";

export function Chat() {
  const { chat } = useStore();

  const messages = useQuery(api.message.getAll, {
    chat_id: chat!.chat_id,
  });
  return (
    <div className={styles.wrapper}>
      <HeaderChat chat={chat!} />
    </div>
  );
}
