import { useProfileInfo } from "@/5.entities";
import { ProfileInfoParamsType } from "@/5.entities";

import styles from "./component.module.scss";
import Image from "next/image";

export function ProfileInfo({ doc, type }: ProfileInfoParamsType) {
  const info = useProfileInfo({ doc, type });
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        {info?.avatar_url && (
          <Image
            src={info.avatar_url[info!.avatar_url.length - 1]}
            alt={"avatar"}
            width={70}
            height={70}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.info}>
        <div>{info?.username}</div>
        <div>{info?.about}</div>
      </div>
    </div>
  );
}
