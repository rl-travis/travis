import React from "react";

import classNames from "classnames/bind";

import styles from "./component.module.scss";

import { ArrowLeft, Bolt } from "lucide-react";

import { IconLogo, useSettingsStore } from "@/6.shared";

const cx = classNames.bind(styles);

export function Header() {
  const { openSettings, setOpenSettings } = useSettingsStore();
  return (
    <header className={styles.header}>
      <div
        className={cx(styles.overlay, {
          transform: openSettings,
        })}
      >
        <IconLogo />
        <button
          className={cx(styles.btn, {
            active: openSettings,
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
