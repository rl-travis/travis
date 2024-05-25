import cx from "classnames";

import styles from "./footer.module.scss";

import { ArrowLeft, Bolt } from "lucide-react";

import { IconLogo, useChatStore, useFullStore, useShortStore } from "@/6.shared";

export function Footer() {
  const { status, setStatus, setMenuSettings } = useFullStore();
  const { stack, add, pop } = useShortStore();
  const { setChat, setStatusSidebar } = useChatStore();
  const close = () => {
    const p = pop();
    if (p === "settings") {
      setStatus(null);
    } else if (p === "settings_language" || p === "settings_profile") {
      setMenuSettings(null);
    } else if (p === "chat") {
      setChat(null);
    } else if (p === "chat_info") {
      setStatusSidebar("info");
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
          className={cx(styles.btn, { [styles.active]: status === "settings" })}
          onClick={() => {
            setStatus(null);
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
