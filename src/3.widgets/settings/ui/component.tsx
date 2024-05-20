import styles from "./component.module.scss";

import { SettingsList } from "./settings-list";

import { ProfileInfo } from "@/4.features";

import { useUserStore } from "@/6.shared";

export function Settings() {
  const { user } = useUserStore();

  return (
    <div className={styles.wrapper}>
      <ProfileInfo doc={user!._id} type={"user"} />
      <SettingsList />
    </div>
  );
}
