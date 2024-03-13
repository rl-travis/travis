import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";
import { ChangeProfileType } from "@/types/ChangeProfileType";
import { useInter } from "@/hooks/useInter";

export default function NewUser() {
  function onDone(info: ChangeProfileType) {}

  return (
    <div className={styles.wrapper}>
      <ChangeProfile
        username={""}
        avatar={""}
        name={""}
        about={""}
        isCreate={true}
        onDone={onDone}
      />
    </div>
  );
}
