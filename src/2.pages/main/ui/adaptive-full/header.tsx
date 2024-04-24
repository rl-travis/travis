import styles from "./component.module.scss";
import { IconLogo, useSettingsStore } from "@/6.shared";
import React from "react";
import { ArrowLeft, Bolt } from "lucide-react";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export function Header() {
  const { openSettings, setOpenSettings } = useSettingsStore();
  return (
    <header className={styles.header}>
      <div
        className={cx(styles.header__overlay, {
          header__active: openSettings,
        })}
      >
        <IconLogo />
        <button
          className={cx(styles.btn, {
            btn__active: openSettings,
          })}
          onClick={() => setOpenSettings(!openSettings)}
        >
          <Bolt size={20} />
        </button>
      </div>
      <button className={styles.btn} onClick={() => setOpenSettings(false)}>
        <ArrowLeft size={20} />
      </button>
    </header>
  );
}
