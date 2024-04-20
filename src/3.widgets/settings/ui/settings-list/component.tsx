import styles from "./component.module.scss";
import { ChevronRight, Languages, UserRound } from "lucide-react";

import classNames from "classnames/bind";
import React from "react";

const cx = classNames.bind(styles);

export function SettingsList({
  isAccount,
  setIsAccount,
}: {
  isAccount: boolean;
  setIsAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.item, {
          active: isAccount,
        })}
        onClick={() => {
          setIsAccount(true);
        }}
      >
        <UserRound size={20} className={cx(styles.lucide, styles.profile)} />
        <span className={styles.title}>Мой профиль</span>
        {!isAccount && <ChevronRight size={20} />}
      </div>
      <div
        className={cx(styles.item, {
          // active: isLanguage,
        })}
        onClick={() => {
          // setIsLanguage(true);
        }}
      >
        <Languages size={20} className={cx(styles.lucide, styles.language)} />
        <span className={styles.title}>Язык</span>
        <ChevronRight size={20} />
      </div>
    </div>
  );
}
