import React from "react";
import styles from "./Auth.module.scss";
import IconLogo from "@/components/Icon/IconLogo";
import IconGithub from "@/components/Icon/IconGithub";
import IconGoogle from "@/components/Icon/IconGoogle";
import { signIn } from "next-auth/react";

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
