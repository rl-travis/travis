import styles from "./component.module.scss";

import { i18nType } from "@/6.shared";

export function Rules({ i18n }: { i18n: i18nType }) {
  return (
    <div className={styles.wrapper}>
      {i18n.changeProfile.rules[0]}
      <span>{i18n.changeProfile.rules[1]}</span>
      {i18n.changeProfile.rules[2]}
      <span>{i18n.changeProfile.rules[3]}</span>
      {i18n.changeProfile.rules[4]}
      <span>{i18n.changeProfile.rules[5]}</span>
      <br />
      {i18n.changeProfile.rules[6]}
    </div>
  );
}
