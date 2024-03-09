import styles from "./ChangeProfile.module.scss";
import { InfoType } from "@/components/NewUser/NewUser";
import { useInter } from "@/hooks/useInter";
import UploadWrapper from "@/components/Upload/UploadWrapper";
import { ImagePlus } from "lucide-react";

import bg from "/public/logo-bg.svg";

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

  return (
    <div className={styles.wrapper}>
      {isCreate ? (
        <span className={styles.title}>{i18n.profile.createTitle}</span>
      ) : (
        <span>{i18n.profile.changeTitle}</span>
      )}

      <UploadWrapper loading={52} onUpload={() => console.log(52)} multiple>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${bg.src})`, backgroundRepeat: "no-repeat" }}
        >
          <ImagePlus size={40} />
        </div>
      </UploadWrapper>

      <label htmlFor={"name"} className={styles.inputBlock}>
        {name && <span className={styles.subtitle}>{i18n.profile.name}*</span>}
        <input
          type="text"
          placeholder={`${i18n.profile.name}*`}
          id={"name"}
          className={styles.input}
          autoComplete={"off"}
        />
      </label>
      <label htmlFor={"about"} className={styles.inputBlock}>
        {about && <span className={styles.subtitle}>{i18n.profile.about}</span>}
        <input
          type="text"
          placeholder={`${i18n.profile.about}`}
          id={"about"}
          className={styles.input}
          autoComplete={"off"}
        />
      </label>
      <label htmlFor={"username"} className={styles.inputBlock}>
        {username && <span className={styles.subtitle}>{i18n.profile.username}*</span>}
        <input
          type="text"
          placeholder={`${i18n.profile.username}*`}
          id={"about"}
          className={styles.input}
          autoComplete={"off"}
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
    </div>
  );
}
