import styles from "./index.module.scss";
import { IconGithub, IconGoogle, IconLogo } from "@/6.shared";
import { signIn } from "next-auth/react";
import React from "react";

export function AuthPage() {
  return (
    <div className={styles.wrapper}>
      <IconLogo />
      <button className={styles.btn} onClick={() => signIn("google")}>
        <IconGoogle />
      </button>
      <button className={styles.btn} onClick={() => signIn("github")}>
        <IconGithub />
      </button>
    </div>
  );
}
