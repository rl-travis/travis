import styles from "./ChangeProfile.module.scss";
import { InfoType } from "@/components/NewUser/NewUser";
import { i18nList, useInter } from "@/hooks/useInter";
import UploadWrapper from "@/components/Upload/UploadWrapper";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import bg from "/public/logo-bg.svg";
import { ChangeEvent, useRef, useState } from "react";

type PropsType = {
  name: string;
  about: string;
  username: string;
  avatar: string;
  locales: number;
  isCreate: boolean;
  onDone: (info: InfoType) => void;
};

export default function ChangeProfile({
  name,
  avatar,
  username,
  about,
  isCreate,
  locales,
  onDone,
}: PropsType) {
  const { i18n, switchLang } = useInter();

  const [usernameValue, setUsernameValue] = useState(username);
  const [nameValue, setNameValue] = useState(name);
  const [aboutValue, setAboutValue] = useState(about);
  const [avatarValue, setAvatarValue] = useState(avatar);
  const [localesValue, setLocalesValue] = useState(locales);

  const usernameRef = useRef<HTMLInputElement>(null);

  function changeUsername() {
    if (usernameRef.current) {
      usernameRef.current.value = usernameRef.current.value.slice(0, 69);
    }
  }

  return (
    <div className={styles.wrapper}>
      {isCreate ? (
        <span className={styles.title}>{i18n.profile.createTitle}</span>
      ) : (
        <span>{i18n.profile.changeTitle}</span>
      )}

      <UploadWrapper
        loading={<div>Загрузка...</div>}
        onUpload={(files) => setAvatarValue(files[0].url)}
        multiple
      >
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${bg.src})`, backgroundRepeat: "no-repeat" }}
        >
          <ImagePlus size={40} />
        </div>
      </UploadWrapper>

      <label htmlFor={"name"} className={styles.inputBlock}>
        {nameValue && <span className={styles.subtitle}>{i18n.profile.name}*</span>}
        <input
          type="text"
          placeholder={`${i18n.profile.name}*`}
          id={"name"}
          className={styles.input}
          autoComplete={"off"}
          onChange={(event) => setNameValue(event.target.value)}
        />
      </label>
      <label htmlFor={"about"} className={styles.inputBlock}>
        {aboutValue && <span className={styles.subtitle}>{i18n.profile.about}</span>}
        <input
          type="text"
          placeholder={`${i18n.profile.about}`}
          id={"about"}
          className={styles.input}
          autoComplete={"off"}
          onChange={(event) => setAboutValue(event.target.value)}
        />
        {aboutValue && (
          <span className={styles.subtitle + " " + styles.number}>
            {70 - aboutValue.length}
          </span>
        )}
      </label>
      <label htmlFor={"username"} className={styles.inputBlock}>
        {usernameValue && (
          <span className={styles.subtitle}>{i18n.profile.username}*</span>
        )}
        <input
          type="text"
          placeholder={`${i18n.profile.username}*`}
          id={"about"}
          className={styles.input}
          autoComplete={"off"}
          onChange={() => changeUsername()}
          ref={usernameRef}
        />
      </label>
      <div className={styles.rules}>
        <div>
          <span>{i18n.profile.usernameRules} </span>
          <span className={styles.rule}>{i18n.profile.usernameSymbols[0]}</span>
          <span>, </span>
          <span className={styles.rule}>{i18n.profile.usernameSymbols[1]} </span>
          <span>{i18n.profile.and} </span>
          <span className={styles.rule}>{i18n.profile.usernameSymbols[2]}</span>
        </div>
        <div>{i18n.profile.usernameLength}</div>
      </div>

      <div className={styles.languages}>
        <span>{i18n.profile.lang}</span>
        <div className={styles.languagesBlock}>
          <button
            onClick={() => {
              setLocalesValue(0);
              switchLang(0);
            }}
            className={
              localesValue === 0
                ? styles.button + " " + styles.activeButton
                : styles.button
            }
          >
            English
          </button>
          <button
            onClick={() => {
              setLocalesValue(1);
              switchLang(1);
            }}
            className={
              localesValue === 1
                ? styles.button + " " + styles.activeButton
                : styles.button
            }
          >
            Русский
          </button>
        </div>
      </div>
    </div>
  );
}
