import React from "react";
import styles from "./styles.module.scss";
import TextArea from "@/components/TextArea/TextArea";
import { useInter } from "@/hooks/useInter";
import Avatar from "@/components/ChangeProfile/Avatar";
import Rules from "@/components/ChangeProfile/Rules";
import Switch from "@/components/ChangeProfile/Switch";
import Checking from "@/components/ChangeProfile/Checking";
import { Doc } from "../../../convex/_generated/dataModel";
import { ChangeProfileType } from "@/types/ChangeProfileType";

export default function ChangeProfile({
  username = "",
  about = "",
  name = "",
  avatar = "https://i.ibb.co/XbKhr5X/avatar.jpg",
  title,
  done,
}: {
  done: (profile: ChangeProfileType) => void;
  username?: string;
  name?: string;
  about?: string;
  avatar?: string;
  title: string;
}) {
  const { i18n } = useInter();
  const [nameValue, setNameValue] = React.useState(name);
  const [aboutValue, setAboutValue] = React.useState(about);
  const [usernameValue, setUsernameValue] = React.useState(username);

  const [avatarDoc, setAvatarDoc] = React.useState<Doc<"file"> | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <Avatar avatar={avatar} setAvatarDoc={setAvatarDoc} />
      <TextArea
        maxLength={70}
        title={i18n.changeProfile.name}
        value={nameValue}
        setValue={setNameValue}
      />
      <TextArea
        maxLength={52}
        title={i18n.changeProfile.about}
        value={aboutValue}
        setValue={setAboutValue}
      />
      <div className={styles.username}>
        <TextArea
          maxLength={70}
          title={i18n.changeProfile.username}
          value={usernameValue}
          setValue={setUsernameValue}
          regex={/^[a-z0-9_]*$/i}
        />
        <Checking username={username} usernameValue={usernameValue} i18n={i18n} />
        <Rules i18n={i18n} />
      </div>
      <Switch />
      <button
        className={styles.btn}
        disabled={usernameValue.length < 5 || nameValue.length === 0}
        onClick={() => {
          done({
            username: usernameValue,
            name: nameValue,
            avatarDoc: avatarDoc,
            about: aboutValue,
          });
        }}
      >
        {i18n.changeProfile.btn}
      </button>
    </div>
  );
}
