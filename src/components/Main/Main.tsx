import styles from "./Main.module.scss";
import { signOut } from "next-auth/react";

export default function Main() {
  return (
    <div className={styles.wrapper} onClick={() => signOut()}>
      Main
    </div>
  );
}
