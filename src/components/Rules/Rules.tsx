import styles from "./Rules.module.scss";
import { useInter } from "@/hooks/useInter";

export default function Rules() {
  const { i18n } = useInter();
  return (
    <div className={styles.rules}>
      <div>
        <span>{i18n.profile.usernameRules} </span>
        <span className={styles.rule}>{i18n.profile.usernameSymbols[0]}</span>
        <span>, </span>
        <span className={styles.rule}>{i18n.profile.usernameSymbols[1]} </span>
        <span>{i18n.profile.and} </span>
        <span className={styles.rule}>{i18n.profile.usernameSymbols[2]}</span>
      </div>
      <div>{i18n.profile.usernameLength}</div>
    </div>
  );
}
