import styles from "./page.module.scss";
import { IconGithub, IconGoogle, IconLogo } from "@/6.shared";
import { signIn } from "next-auth/react";
import React from "react";

export function AuthPage({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.wrapper}>
      <IconLogo />
      <button
        className={styles.btn}
        onClick={async () => {
          setLoading(true);
          await signIn("google");
        }}
      >
        <IconGoogle />
      </button>
      <button
        className={styles.btn}
        onClick={async () => {
          setLoading(true);
          await signIn("github");
        }}
      >
        <IconGithub />
      </button>
    </div>
  );
}
