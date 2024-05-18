import React, { useEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import classNames from "classnames/bind";

import styles from "./component.module.scss";

import { FormInterface } from "../../lib";

import { Check, X } from "lucide-react";

import { useUser } from "@/5.entities";

import { debounce, i18nType } from "@/6.shared";

const cx = classNames.bind(styles);
export function Checking({
  username,
  i18n,
  watch,
  setValue,
}: {
  watch: UseFormWatch<FormInterface>;
  username: string;
  i18n: i18nType;
  setValue: UseFormSetValue<FormInterface>;
}) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { checkUsername } = useUser();
  const debounceCheck = debounce(check, 200);

  async function check() {
    const b = await checkUsername({
      username: watch("username"),
    });
    setIsBusy(b);
    setValue("busy", b);
    setIsValid(true);
  }

  useEffect(() => {
    if (watch("username").length >= 5 && watch("username") !== username) {
      debounceCheck();
    } else {
      setIsValid(false);
    }
  }, [watch("username")]);
  return (
    <div
      className={cx(styles.check, {
        busy: isValid && isBusy,
        free: isValid && !isBusy,
      })}
    >
      {isBusy && (
        <>
          <X size={12} />
          <span>{i18n.profile.busy}</span>
        </>
      )}
      {!isBusy && (
        <>
          <Check size={12} />
          <span>{i18n.profile.free}</span>
        </>
      )}
    </div>
  );
}
