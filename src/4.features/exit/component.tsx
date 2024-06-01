import React from "react";

import styles from "./exit.module.scss";
import { signOut } from "next-auth/react";

import { LogOut } from "lucide-react";

import { useInter } from "@/6.shared";

export const Exit = () => {
  const { i18n } = useInter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} onClick={() => signOut()}>
        <div className={styles.logout}>
          <LogOut size={20} />
        </div>
        <span className={styles.title}>{i18n.exit}</span>
      </div>
    </div>
  );
};
