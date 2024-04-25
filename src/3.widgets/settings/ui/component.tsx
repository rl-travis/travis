import styles from "./component.module.scss";
import React from "react";
import { ProfileInfo } from "@/4.features";
import { useUserStore } from "@/6.shared";
import { SettingsList } from "./settings-list";

export function Settings() {
  const { user } = useUserStore();

  return (
    <div className={styles.wrapper}>
      <ProfileInfo doc={user!._id} type={"user"} />
      <SettingsList />
    </div>
  );
}
