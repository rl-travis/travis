import { useProfileInfo } from "@/5.entities";
import { ProfileInfoParamsType } from "@/5.entities";

import styles from "./component.module.scss";
import Image from "next/image";
import { AtSign, Info } from "lucide-react";

export function ProfileInfo({ doc, type }: ProfileInfoParamsType) {
  const info = useProfileInfo({ doc, type });
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{info?.name}</div>
      <div className={styles.avatar}>
        {info?.avatar_urls && (
          <Image
            src={info.avatar_urls[info!.avatar_urls.length - 1]}
            alt={"avatar"}
            width={1000}
            height={1000}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.username}>
          <div className={styles.lucide}>
            <AtSign size={20} />
          </div>
          <span>{info?.username}</span>
        </div>
        <div className={styles.about}>
          <div className={styles.lucide}>
            <Info size={20} />
          </div>
          <span>{info?.about}</span>
        </div>
      </div>
    </div>
  );
}
