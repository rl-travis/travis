import styles from "./ChangeProfile.module.scss";
import { useInter } from "@/hooks/useInter";
import UploadWrapper from "@/components/Upload/UploadWrapper";
import { ImagePlus } from "lucide-react";
import avatarImage from "/public/logo-avatar.svg";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { ChangeProfileType } from "@/types/ChangeProfileType";
import { debounce } from "@/utils/debounce";
import Textarea from "@/components/UI/Textarea/Textarea";
import Checking from "@/components/Checking/Checking";
import Rules from "@/components/Rules/Rules";
import SwitchLanguage from "@/components/SwitchLanguage/SwitchLanguage";

type PropsType = {
  name: string;
  about: string;
  username: string;
  avatar: string;
  isCreate: boolean;
  onDone: (info: ChangeProfileType) => void;
};

export default function ChangeProfile({
  name,
  avatar,
  username,
  about,
  isCreate,
  onDone,
}: PropsType) {
  const { i18n } = useInter();

  const checkUsernameMutation = useMutation(api.user.checkUsername);

  const [usernameValue, setUsernameValue] = useState(username);
  const [nameValue, setNameValue] = useState(name);
  const [aboutValue, setAboutValue] = useState(about);
  const [avatarValue, setAvatarValue] = useState(avatar);

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const debounceCheck = debounce(check, 200);

  async function check() {
    setIsBusy(
      await checkUsernameMutation({
        username: usernameValue,
      }),
    );
  }

  useEffect(() => {
    if (usernameValue.length >= 5 && usernameValue !== username) {
      setIsChecking(true);
      debounceCheck();
      setIsChecking(false);
    }
  }, [usernameValue]);

  return (
    <div className={styles.wrapper}>
      {isCreate ? (
        <span className={styles.title}>{i18n.profile.createTitle}</span>
      ) : (
        <span className={styles.title}>{i18n.profile.changeTitle}</span>
      )}

      <UploadWrapper
        loading={<div>Загрузка...</div>}
        onUpload={(files) => setAvatarValue("")}
        multiple={false}
        accept={"image/*"}
      >
        <div className={styles.imageBlock}>
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${avatarImage.src})`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className={styles.fill}></div>
          <ImagePlus size={40} className={styles.lucideImage} />
        </div>
      </UploadWrapper>

      <Textarea
        value={nameValue}
        placeholder={`${i18n.profile.name}*`}
        maxSize={52}
        setState={setNameValue}
        subtitle={`${i18n.profile.name}*`}
      />

      <Textarea
        value={aboutValue}
        placeholder={i18n.profile.about}
        maxSize={70}
        setState={setAboutValue}
        subtitle={i18n.profile.about}
      />
      <div className={styles.usernameBlock}>
        <Textarea
          value={usernameValue}
          placeholder={`${i18n.profile.username}*`}
          maxSize={52}
          setState={setUsernameValue}
          subtitle={`${i18n.profile.username}*`}
          regex={/^[a-z0-9_]*$/i}
        />
        <Checking isChecking={isChecking} isBusy={isBusy} value={usernameValue} />
      </div>
      <Rules />
      <SwitchLanguage />
      <button
        className={
          usernameValue.length >= 5 && !isBusy && nameValue
            ? styles.activeButton
            : styles.button
        }
        onClick={() => {
          if (usernameValue.length >= 5 && !isBusy && nameValue) {
            onDone({
              avatar: avatarValue,
              about: aboutValue,
              name: nameValue,
              username: usernameValue,
              locales: i18n.id,
            });
          }
        }}
      >
        {isCreate ? (
          <span className={styles.title}>{i18n.profile.createButton}</span>
        ) : (
          <span className={styles.title}>{i18n.profile.changeButton}</span>
        )}
      </button>
    </div>
  );
}
