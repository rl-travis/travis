import styles from "./component.module.scss";
import { Checkbox, useInter, useStore } from "@/6.shared";
import { useUser } from "@/5.entities";

export function LanguageInfo() {
  const { i18n, switchLang } = useInter();

  const { user } = useStore();
  const { edit } = useUser();

  async function switchLanguage(id: number) {
    switchLang(id);
    await edit({
      user_id: user!._id,
      username: user!.username,
      about: user!.about,
      name: user!.name,
      locales: id,
    });
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.name}>{i18n.settings.language}</h3>
      <div className={styles.language} onClick={() => switchLanguage(1)}>
        <div className={styles.left}>
          <span className={styles.title}>{i18n.language.ru}</span>
          <span className={styles.subtitle}>Русский</span>
        </div>
        {i18n.id === 1 && <Checkbox />}
      </div>

      <div className={styles.language} onClick={() => switchLanguage(0)}>
        <div className={styles.left}>
          <span className={styles.title}>{i18n.language.en}</span>
          <span className={styles.subtitle}>English</span>
        </div>
        {i18n.id === 0 && <Checkbox />}
      </div>
    </div>
  );
}
