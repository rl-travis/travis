import { useProfileInfo } from "@/5.entities";
import { ProfileInfoParamsType } from "@/5.entities";

import styles from "./component.module.scss";
import { AtSign, Info } from "lucide-react";
import { SliderAvatar } from "@/6.shared";
import React from "react";

export function ProfileInfo({ doc, type }: ProfileInfoParamsType) {
  const info = useProfileInfo({ doc, type });
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{info?.name ? info.name : "Загрузка..."}</div>
      {info?.avatar_urls && <SliderAvatar images={info.avatar_urls} />}
      <div className={styles.info}>
        {info?.username && (
          <div className={styles.username}>
            <div className={styles.btn}>
              <AtSign size={20} />
            </div>
            <span>{info.username}</span>
          </div>
        )}
        {info?.about && (
          <div className={styles.about}>
            <div className={styles.btn}>
              <Info size={20} />
            </div>
            <span>{info.about}</span>
          </div>
        )}
      </div>
    </div>
  );
}
