import React from "react";
import styles from "./component.module.scss";
import { Bolt } from "lucide-react";
import { signOut } from "next-auth/react";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ChatList } from "@/3.widgets";
import { IconLogo } from "@/6.shared";
import { ChatType } from "@/5.entities";

export function AdaptiveShort({
  chats,
  user,
}: {
  chats: ChatType[] | undefined;
  user: Doc<"user">;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <ChatList chats={chats} user={user} />
      </div>
      <div className={styles.bottom}>
        <div onClick={() => signOut()}>
          <IconLogo />
        </div>
        <button className={styles.btn}>
          <Bolt size={20} />
        </button>
      </div>
    </div>
  );
}
