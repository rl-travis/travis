import styles from "./ChangeProfile.module.scss";
import { useContext } from "react";
import { InternationalizationContext } from "@/providers/InternationalizationProvider";

type PropsType = {
  name: string;
  about: string;
  username: string;
  avatar: string;
  locales: number;
  isCreate: boolean;
  onDone: (obj: {}) => void;
};

export default function ChangeProfile({
  name,
  avatar,
  username,
  about,
  isCreate,
  locales,
  onDone,
}: PropsType) {
  const { setId } = useContext(InternationalizationContext);

  return (
    <div className={styles.wrapper}>{isCreate ? <span></span> : <span></span>}</div>
  );
}
