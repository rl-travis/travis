import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { i18nList, useInter } from "@/6.shared";

const cx = classNames.bind(styles);
export default function Switch() {
  const { i18n, switchLang } = useInter();

  return (
    <div className={styles.lang}>
      {i18n.changeProfile.language}
      <div className={styles.block}>
        {i18nList.map((e) => {
          return (
            <button
              tabIndex={2}
              key={e.id}
              className={cx(styles.btn, {
                active: e.id === i18n.id,
                inactive: e.id !== i18n.id,
              })}
              onClick={() => switchLang(e.id)}
            >
              {e.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
