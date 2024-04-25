import React from "react";

import classNames from "classnames/bind";

import styles from "./component.module.scss";

import { i18nList, useInter } from "@/6.shared";

const cx = classNames.bind(styles);
export function Switch() {
  const { i18n, switchLang } = useInter();

  return (
    <div className={styles.lang}>
      {i18n.changeProfile.language}
      <div className={styles.block}>
        {i18nList.map((e) => {
          return (
            <div
              role="button"
              key={e.id}
              className={cx(styles.btn, {
                active: e.id === i18n.id,
                inactive: e.id !== i18n.id,
              })}
              onClick={() => switchLang(e.id)}
            >
              {e.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
