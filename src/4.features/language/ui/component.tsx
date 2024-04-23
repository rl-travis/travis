import styles from "./component.module.scss";
import { Checkbox, useInter } from "@/6.shared";

export function LanguageInfo() {
  const { i18n, switchLang } = useInter();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.name}>{i18n.settings.language}</h3>
      <div className={styles.language} onClick={() => switchLang(1)}>
        <div className={styles.left}>
          <span className={styles.title}>{i18n.language.ru}</span>
          <span className={styles.subtitle}>Русский</span>
        </div>
        {i18n.id === 1 && <Checkbox />}
      </div>

      <div className={styles.language} onClick={() => switchLang(0)}>
        <div className={styles.left}>
          <span className={styles.title}>{i18n.language.en}</span>
          <span className={styles.subtitle}>English</span>
        </div>
        {i18n.id === 0 && <Checkbox />}
      </div>
    </div>
  );
}
