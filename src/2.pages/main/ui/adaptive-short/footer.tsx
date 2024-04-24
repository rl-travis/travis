import styles from "./component.module.scss";
import classNames from "classnames/bind";
import {
  IconLogo,
  useChatStore,
  useSettingsStore,
  useShortStackStore,
} from "@/6.shared";
import { ArrowLeft, Bolt } from "lucide-react";
const cx = classNames.bind(styles);
export function Footer() {
  const { openSettings, setOpenSettings, setMenuSettings } = useSettingsStore();
  const { stack, add, pop } = useShortStackStore();
  const { setChat } = useChatStore();
  const close = () => {
    const p = pop();
    if (p === "settings") {
      setOpenSettings(false);
    } else if (p === "settings_language") {
      setMenuSettings(null);
    } else if (p === "settings_profile") {
      setMenuSettings(null);
    } else if (p === "chat") {
      setChat(null);
    } else {
      throw new Error("Критическая ошибка в логике");
    }
  };
  return (
    <footer className={styles.footer}>
      <div
        className={cx(styles.footer__overlay, {
          footer__overlay_active: stack.length > 0,
        })}
      >
        <IconLogo />
        <button
          className={cx(styles.btn, { btn__active: openSettings })}
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
