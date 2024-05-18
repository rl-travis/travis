import cx from "classnames";

import styles from "./component.module.scss";

import { ArrowLeft, Bolt } from "lucide-react";

import {
  IconLogo,
  useChatStore,
  useSettingsStore,
  useShortStackStore,
} from "@/6.shared";

export function Footer() {
  const { openSettings, setOpenSettings, setMenuSettings } = useSettingsStore();
  const { stack, add, pop } = useShortStackStore();
  const { setChat, setOpenChatInfo } = useChatStore();
  const close = () => {
    const p = pop();
    if (p === "settings") {
      setOpenSettings(false);
    } else if (p === "settings_language" || p === "settings_profile") {
      setMenuSettings(null);
    } else if (p === "chat") {
      setChat(null);
    } else if (p === "chat_info") {
      setOpenChatInfo(false);
    } else {
      throw new Error("Критическая ошибка в логике");
    }
  };
  return (
    <footer className={styles.footer}>
      <div
        className={cx(styles.overlay, {
          [styles.transform]: stack.length > 0,
        })}
      >
        <IconLogo />
        <button
          className={cx(styles.btn, { [styles.active]: openSettings })}
          onClick={() => {
            setOpenSettings(!openSettings);
            add("settings");
          }}
        >
          <Bolt size={20} />
        </button>
      </div>
      <button className={styles.btn} onClick={close}>
        <ArrowLeft size={20} />
      </button>
    </footer>
  );
}
