import styles from "./Main.module.scss";
import { Doc } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DevUsers from "@/components/DevUsers/DevUsers";

export default function Main({ user }: { user: Doc<"user"> }) {
  const chats = useQuery(api.user_chat.getChats, {
    user_id: user._id,
  });

  return (
    <div className={styles.wrapper}>
      {chats && <DevUsers user={user} chats={chats} />}
    </div>
  );
}
