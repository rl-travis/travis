import React from "react";
import styles from "./styles.module.scss";
import { i18nList, useInter } from "@/hooks/useInter";
import classNames from "classnames/bind";

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
              key={e.id}
              className={cx({
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
