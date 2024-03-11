import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { useInter } from "@/hooks/useInter";
import { ChangeProfileType } from "@/types/ChangeProfileType";

export default function NewUser() {
  function onDone(info: ChangeProfileType) {}

  return (
    <div className={styles.wrapper}>
      <ChangeProfile
        username={""}
        avatar={""}
        name={""}
        about={""}
        locales={0}
        isCreate={true}
        onDone={onDone}
      />
    </div>
  );
}
