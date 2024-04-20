import { useProfileInfo } from "@/5.entities";
import { ProfileInfoParamsType } from "@/5.entities";

import styles from "./component.module.scss";
import { AtSign, Info } from "lucide-react";
import { MiniLoading, SliderAvatar } from "@/6.shared";

export function ProfileInfo({ doc, type }: ProfileInfoParamsType) {
  const info = useProfileInfo({ doc, type });
  return (
    <>
      {info ? (
        <div className={styles.wrapper}>
          <div className={styles.name}>{info?.name}</div>
          <div className={styles.avatar}>
            <SliderAvatar images={info.avatar_urls} />
          </div>
          <div className={styles.info}>
            {info?.username && (
              <div className={styles.username}>
                <div className={styles.btn}>
                  <AtSign size={20} />
                </div>
                <span>{info.username}</span>
              </div>
            )}
            <div className={styles.about}>
              <div className={styles.btn}>
                <Info size={20} />
              </div>
              <span>{info.about}</span>
            </div>
          </div>
        </div>
      ) : (
        <MiniLoading />
      )}
    </>
  );
}
