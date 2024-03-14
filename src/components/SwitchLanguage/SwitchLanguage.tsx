import styles from "./SwitchLanguage.module.scss";
import { useInter } from "@/hooks/useInter";

export default function SwitchLanguage() {
  const { i18n, switchLang } = useInter();

  return (
    <div className={styles.languages}>
      <span>{i18n.profile.lang}</span>
      <div className={styles.languagesBlock}>
        <button
          onClick={() => {
            switchLang(0);
          }}
          className={
            i18n.id === 0
              ? styles.langButton + " " + styles.langActiveButton
              : styles.langButton
          }
        >
          English
        </button>
        <button
          onClick={() => {
            switchLang(1);
          }}
          className={
            i18n.id === 1
              ? styles.langButton + " " + styles.langActiveButton
              : styles.langButton
          }
        >
          Русский
        </button>
      </div>
    </div>
  );
}
