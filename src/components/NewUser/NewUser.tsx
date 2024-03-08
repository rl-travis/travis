import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";

export default function NewUser() {
  return (
    <div className={styles.wrapper}>
      New User
      <ChangeProfile />
    </div>
  );
}
