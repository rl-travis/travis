import React from "react";
import styles from "./Auth.module.scss";
import IconLogo from "@/components/Icon/IconLogo";
import IconGithub from "@/components/Icon/IconGithub";
import IconGoogle from "@/components/Icon/IconGoogle";
import { SignInButton } from "@clerk/nextjs";
import Loading from "@/components/Loading/Loading";

export default function Auth({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.wrapper}>
      <IconLogo />
      <SignInButton mode={"redirect"}>
        <button className={styles.block}>
          <IconGoogle />
          <IconGithub />
        </button>
      </SignInButton>
    </div>
  );
}
