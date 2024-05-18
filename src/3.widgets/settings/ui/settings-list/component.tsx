import cx from "classnames";

import styles from "./component.module.scss";

import { ChevronRight, Languages, UserRound } from "lucide-react";

import {
  useChatStore,
  useInter,
  useSettingsStore,
  useShortStackStore,
} from "@/6.shared";

export function SettingsList() {
  const { setChat } = useChatStore();

  const { menuSettings, setMenuSettings } = useSettingsStore();
  const { add } = useShortStackStore();
  const { i18n } = useInter();

  return (
    <div className={styles.wrapper}>
      <button
        className={cx(styles.item, {
          [styles.active]: menuSettings === "profile",
        })}
        onClick={() => {
          setChat(null);
          add("settings_profile");
          setMenuSettings("profile");
        }}
      >
        <UserRound size={20} className={cx(styles.lucide, styles.profile)} />
        <span className={styles.title}>{i18n.settings.profile}</span>
        <ChevronRight size={20} className={styles.arrow} />
      </button>
      <button
        className={cx(styles.item, {
          [styles.active]: menuSettings === "language",
        })}
        onClick={() => {
          setChat(null);
          add("settings_language");
          setMenuSettings("language");
        }}
      >
        <Languages size={20} className={cx(styles.lucide, styles.language)} />
        <span className={styles.title}>{i18n.settings.language}</span>
        <ChevronRight size={20} className={styles.arrow} />
      </button>
    </div>
  );
}
