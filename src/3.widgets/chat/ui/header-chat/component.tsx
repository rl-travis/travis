import { ChatType } from "@/5.entities";
import styles from "./component.module.scss";
import Image from "next/image";
import { Search } from "lucide-react";
export function HeaderChat({ chat }: { chat: ChatType }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Image
          src={
            chat.type !== "dialog" ? chat.chat.avatar_url : chat.chat.user.avatar_url
          }
          alt={"avatar"}
          width={30}
          height={30}
          className={styles.image}
        />
        <span className={styles.name}>
          {chat.type !== "dialog" ? chat.chat.name : chat.chat.user.name}
        </span>
      </div>
      <Search size={20} />
    </div>
  );
}
