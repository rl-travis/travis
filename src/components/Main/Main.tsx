import styles from "./Main.module.scss";
import { SignOutButton } from "@clerk/nextjs";

export default function Main() {
  return (
    <div className={styles.wrapper}>
      <SignOutButton>Выйти</SignOutButton>
    </div>
  );
}
