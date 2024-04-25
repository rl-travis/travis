import styles from "./component.module.scss";

import { Check } from "lucide-react";

export function Checkbox() {
  return (
    <div className={styles.wrapper}>
      <Check size={20} color={"#fff"} />
    </div>
  );
}
