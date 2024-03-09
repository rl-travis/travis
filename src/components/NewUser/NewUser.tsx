import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { useInter } from "@/hooks/useInter";

export type InfoType = {
  username: string;
  name: string;
  avatar: string;
  about: string;
  locales: number;
};
export default function NewUser() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const [locales, setLocales] = useState(1);

  function onDone(info: InfoType) {
    setUsername(info.username);
    setName(info.name);
    setAbout(info.about);
    setAvatar(info.avatar);
    setLocales(info.locales);
  }

  return (
    <div className={styles.wrapper}>
      <ChangeProfile
        username={username}
        avatar={avatar}
        name={name}
        about={about}
        locales={locales}
        isCreate={true}
        onDone={onDone}
      />
    </div>
  );
}
