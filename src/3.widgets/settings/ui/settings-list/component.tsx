import styles from "./component.module.scss";
import { SquareUser } from "lucide-react";

import classNames from "classnames/bind";
import React, { useState } from "react";

const cx = classNames.bind(styles);

export function SettingsList({
  setIsAccount,
}: {
  setIsAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.item}
        onClick={() => {
          setIsAccount(true);
        }}
      >
        <SquareUser size={20} />
        <span>Мой профиль</span>
      </div>
    </div>
  );
}
