import styles from "./DevUsers.module.scss";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { Doc, Id } from "../../../convex/_generated/dataModel";
import { ChatType } from "@/types/interfaces/Chat";
import { useTheme } from "next-themes";
import React from "react";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { useInter } from "@/hooks/useInter";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export default function DevUsers({
  user,
  chats,
}: {
  user?: Doc<"user">;
  chats?: ChatType[];
}) {
  const users = useQuery(api.user.devGetAll);
  const { i18n, nextLang } = useInter();
  const { setTheme } = useTheme();
  const [active, setActive] = React.useState(true);
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
    <div
      className={cx(styles.wrapper, {
        active,
      })}
    >
      <button onClick={() => setActive(!active)} className={styles.btn}>
        dev {active ? <ChevronsDown size={16} /> : <ChevronsUp size={16} />}
      </button>
      <span>cur lang - {i18n.name}</span>
      <button onClick={() => setTheme("light")}>change theme [light]</button>
      <button onClick={() => setTheme("dark")}>change theme [dark]</button>
      <button onClick={() => nextLang()}>next lang without save</button>
      {user &&
        chats &&
        users?.map((userItem) => (
          <div key={userItem._id}>
            {userItem._id !== user._id &&
              !chats.find((chat) => {
                if (chat.type === "dialog") {
                  return chat.chat.user._id === userItem._id;
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
