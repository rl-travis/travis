import { SettingsList } from "./settings-list";
import styles from "./settings.module.scss";

import { ProfileInfo } from "@/4.features";

import { useUserStore } from "@/6.shared";

export function Settings({ mobile }: { mobile: boolean }) {
  const { user } = useUserStore();

  return (
    <div className={styles.wrapper}>
      <ProfileInfo doc={user!._id} type={"user"} />
      <SettingsList mobile={mobile} />
    </div>
  );
}
