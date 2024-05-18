import { Dispatch, SetStateAction } from "react";

import styles from "./page.module.scss";

import { signIn } from "next-auth/react";

import { IconGithub, IconGoogle, IconLogo } from "@/6.shared";

export function AuthPage({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
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
