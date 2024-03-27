import styles from "./DevUsers.module.scss";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { Doc, Id } from "../../../convex/_generated/dataModel";
import { Chat } from "@/interfaces/Chat";
import { Dialog } from "@/interfaces/Dialog";

export default function DevUsers({
  user,
  chats,
}: {
  user: Doc<"user">;
  chats: Chat[];
}) {
  const users = useQuery(api.user.devGetAll);

  const dialogCreateMutation = useMutation(api.dialog.create);

  //interlocutor - собеседник, для общего развития
  async function createDialog(interlocutor_id: Id<"user">) {
    if (user?._id) {
      await dialogCreateMutation({
        first_user_id: interlocutor_id,
        second_user_id: user._id,
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      {user &&
        users?.map((userItem) => (
          <div key={userItem._id}>
            {userItem._id !== user._id &&
              !chats.find((chat) => {
                if (chat.type === "dialog") {
                  let dialog = chat as Dialog;
                  return dialog.chat.user._id === userItem._id;
                }
              }) && (
                <button onClick={() => createDialog(userItem._id)}>
                  {userItem.name}
                </button>
              )}
          </div>
        ))}
    </div>
  );
}
