import { useProfileInfo } from "@/5.entities";
import { ProfileInfoParamsType } from "@/5.entities";

import styles from "./component.module.scss";
import { AtSign, Info } from "lucide-react";
import { SliderAvatar, useStore } from "@/6.shared";
import React, { useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function ProfileInfo({ doc, type }: ProfileInfoParamsType) {
  const info = useProfileInfo({ doc, type });
  const theme = useTheme();
  const { user } = useStore();

  const imageLoader = () => {
    return theme.theme === "dark"
      ? `https://i.ibb.co/SfjCc8Q/dark-square.png?w=500&q=$100`
      : `https://i.ibb.co/Yt94MJN/light-square.png?w=500&q=$100`;
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{info?.name ? info.name : "Загрузка..."}</div>
      {info?.avatar_urls ? (
        <SliderAvatar images={info.avatar_urls} />
      ) : (
        <Image
          src={user!.avatar_url}
          alt={""}
          width={0}
          height={0}
          sizes={"100vw"}
          className={styles.image}
          loader={imageLoader}
        ></Image>
      )}

      <div className={styles.info}>
        {type === "user" && (
          <div className={styles.username}>
            <div className={styles.btn}>
              <AtSign size={20} />
            </div>
            <span>{info?.username && info.username}</span>
          </div>
        )}
        <div className={styles.about}>
          <div className={styles.btn}>
            <Info size={20} />
          </div>
          <span>{info?.about && info.about}</span>
        </div>
      </div>
    </div>
  );
}
