import styles from "./ChangeProfile.module.scss";
import { InfoType } from "@/components/NewUser/NewUser";
import { useInter } from "@/hooks/useInter";
import UploadWrapper from "@/components/Upload/UploadWrapper";
import { Check, ImagePlus, Plus } from "lucide-react";
import avatarImage from "/public/logo-avatar.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { changeRef, changeUsernameRef, resetRefs } from "@/utils/ref/ref";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { Loader2Icon } from "lucide-react";

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

  const checkUsernameMutation = useMutation(api.user.checkUsername);

  const [usernameValue, setUsernameValue] = useState(username);
  const [nameValue, setNameValue] = useState(name);
  const [aboutValue, setAboutValue] = useState(about);
  const [avatarValue, setAvatarValue] = useState(avatar);
  const [localesValue, setLocalesValue] = useState(locales);

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const aboutRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  function changeAbout(event: ChangeEvent<HTMLInputElement>) {
    changeRef(aboutRef, 70);
    setAboutValue(event.target.value.slice(0, 70));
  }

  function changeName(event: ChangeEvent<HTMLInputElement>) {
    changeRef(nameRef, 52);
    setNameValue(event.target.value.slice(0, 52));
  }

  function changeUsername(event: ChangeEvent<HTMLInputElement>) {
    changeUsernameRef(usernameRef);
    setUsernameValue(event.target.value.slice(0, 52));
  }

  useEffect(() => {
    document.body.addEventListener("click", () => {
      resetRefs([aboutRef, nameRef, usernameRef]);
    });
    return () => {
      document.body.removeEventListener("click", () => {
        resetRefs([aboutRef, nameRef, usernameRef]);
      });
    };
  }, []);

  useEffect(() => {
    const check = async () => {
      setIsBusy(
        await checkUsernameMutation({
          username: usernameValue,
        }),
      );
    };

    if (usernameValue.length >= 5) {
      setIsChecking(true);
      check();
      setIsChecking(false);
    }
  }, [usernameValue]);

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
          style={{
            backgroundImage: `url(${avatarImage.src})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <ImagePlus size={40} />
        </div>
      </UploadWrapper>

      <label htmlFor={"name"} className={styles.inputBlock}>
        <span className={styles.subtitle}>{nameValue && `${i18n.profile.name}*`}</span>
        <input
          type="text"
          placeholder={`${i18n.profile.name}*`}
          id={"name"}
          className={styles.input}
          autoComplete={"off"}
          onChange={(event) => changeName(event)}
          ref={nameRef}
        />
        <span className={styles.subtitle + " " + styles.number}>
          {nameValue && 52 - nameValue.length}
        </span>
      </label>
      <label htmlFor={"about"} className={styles.inputBlock}>
        {aboutValue && <span className={styles.subtitle}>{i18n.profile.about}</span>}
        <input
          type="text"
          placeholder={`${i18n.profile.about}`}
          id={"about"}
          className={styles.input}
          autoComplete={"off"}
          onChange={(event) => changeAbout(event)}
          ref={aboutRef}
        />
        {aboutValue && (
          <span className={styles.subtitle + " " + styles.number}>
            {70 - aboutValue.length}
          </span>
        )}
      </label>
      <label htmlFor={"username"} className={styles.inputBlock}>
        <span className={styles.subtitle}>
          {usernameValue && `${i18n.profile.username}*`}
        </span>
        <input
          type="text"
          placeholder={`${i18n.profile.username}*`}
          id={"username"}
          className={styles.input}
          autoComplete={"off"}
          onChange={(event) => changeUsername(event)}
          ref={usernameRef}
        />
        {usernameValue.length >= 5 && (
          <>
            {isChecking && (
              <div className={styles.checking}>
                <Loader2Icon size={12} className={styles.lucide} />
                <span>{i18n.profile.check}</span>
              </div>
            )}
            {isBusy && (
              <div className={styles.busy}>
                <Plus size={12} className={styles.lucidePlus} />
                <span>{i18n.profile.busy}</span>
              </div>
            )}
            {!isChecking && !isBusy && (
              <div className={styles.free}>
                <Check width={12} height={12} />
                <span>{i18n.profile.free}</span>
              </div>
            )}
          </>
        )}

        <span className={styles.subtitle + " " + styles.number}>
          {usernameValue && 52 - usernameValue.length}
        </span>
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
                ? styles.langButton + " " + styles.langActiveButton
                : styles.langButton
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
                ? styles.langButton + " " + styles.langActiveButton
                : styles.langButton
            }
          >
            Русский
          </button>
        </div>
      </div>
      <button
        className={
          usernameValue.length > 5 && !isBusy && nameValue
            ? styles.activeButton
            : styles.button
        }
        onClick={() => {
          if (usernameValue.length > 5 && !isBusy && nameValue) {
            onDone({
              avatar: avatarValue,
              about: aboutValue,
              name: nameValue,
              locales: localesValue,
              username: usernameValue,
            });
          }
        }}
      >
        {isCreate ? (
          <span className={styles.title}>{i18n.profile.createButton}</span>
        ) : (
          <span>{i18n.profile.changeButton}</span>
        )}
      </button>
    </div>
  );
}
