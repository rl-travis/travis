import styles from "./component.module.scss";
import { ChevronRight, Languages, UserRound } from "lucide-react";

import classNames from "classnames/bind";
import React from "react";
import { useInter, useSettingsStore, useStore } from "@/6.shared";

const cx = classNames.bind(styles);

export function SettingsList() {
  const { close } = useStore();

  const { isProfile, isLanguage, openProfile, openLanguage, reset } =
    useSettingsStore();

  const { i18n } = useInter();

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.item, {
          active: isProfile,
        })}
        onClick={() => {
          reset();
          close();
          openProfile();
        }}
      >
        <UserRound size={20} className={cx(styles.lucide, styles.profile)} />
        <span className={styles.title}>{i18n.settings.profile}</span>
        {!isProfile && <ChevronRight size={20} />}
      </div>
      <div
        className={cx(styles.item, {
          active: isLanguage,
        })}
        onClick={() => {
          reset();
          openLanguage();
        }}
      >
        <Languages size={20} className={cx(styles.lucide, styles.language)} />
        <span className={styles.title}>{i18n.settings.language}</span>
        {!isLanguage && <ChevronRight size={20} />}
      </div>
    </div>
  );
}
