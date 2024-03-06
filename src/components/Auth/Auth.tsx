import React from "react";
import styles from "./Auth.module.scss";
import IconLogo from "@/components/Icon/IconLogo";
import IconGithub from "@/components/Icon/IconGithub";
import IconGoogle from "@/components/Icon/IconGoogle";
import { useSignIn } from "@clerk/nextjs";
import Loading from "@/components/Loading/Loading";

export default function Auth() {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) {
    return <Loading />;
  }
  const signInWithGoogle = () =>
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });

  const signInWithGithub = () =>
    signIn.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  return (
    <div className={styles.wrapper}>
      <IconLogo />

      <div className={styles.block}>
        <button className={styles.btn} onClick={signInWithGoogle}>
          <IconGoogle />
        </button>
        <button className={styles.btn} onClick={signInWithGithub}>
          <IconGithub />
        </button>
      </div>
    </div>
  );
}
