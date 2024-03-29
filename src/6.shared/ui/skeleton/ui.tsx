import React from "react";
import styles from "./index.module.scss";

/*
  В него нужно передавать только div-элементы, другие не пойдут
  Пример можно увидеть в этой же папке - SkeletonChat.tsx
 */
export function Skeleton({ children }: { children: React.ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export function SkeletonChat() {
  return (
    <Skeleton>
      <div
        style={{
          width: "100%",
          height: 60,
          borderRadius: 10,
          display: "flex",
          padding: 10,
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            flex: 1,
            height: 30,
            borderRadius: 10,
          }}
        />
      </div>
    </Skeleton>
  );
}
