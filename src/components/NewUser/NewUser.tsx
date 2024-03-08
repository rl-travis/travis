import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";
import { SignOutButton } from "@clerk/nextjs";

export default function NewUser() {
  return (
    <div className={styles.wrapper}>
      <SignOutButton>Выйти</SignOutButton>
      <ChangeProfile />
    </div>
  );
}
