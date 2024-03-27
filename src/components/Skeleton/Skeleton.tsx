import React from "react";
import styles from "./Skeleton.module.scss";

/*
  В него нужно передавать только div-элементы, другие не пойдут
  Пример можно увидеть в этой же папке - SkeletonChat.tsx
 */
export default function Skeleton({ children }: { children: React.ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>;
}
