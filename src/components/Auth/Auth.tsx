import React from "react";
import styles from "./Auth.module.scss";
import { signIn } from "next-auth/react";
import { IconGithub, IconGoogle, IconLogo } from "@/6.shared";
export default function Auth() {
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
