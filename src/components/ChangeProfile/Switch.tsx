import React from "react";
import styles from "./styles.module.scss";
import { i18nList, useInter } from "@/hooks/useInter";
export default function Switch() {
  const { i18n, switchLang } = useInter();
  return (
    <div className={styles.langWrapper}>
      {i18n.changeProfile.language}
      <div className={styles.langBlock}>
        {i18nList.map((e) => {
          return (
            <button
              key={e.id}
              className={e.id === i18n.id ? styles.langActive : styles.lang}
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
