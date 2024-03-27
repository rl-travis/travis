import React from "react";
import styles from "./AdaptiveFull.module.scss";
import SkeletonChat from "@/components/Skeleton/SkeletonChat";

export default function AdaptiveFull() {
  return (
    <div className={styles.wrapper}>
      <SkeletonChat />
    </div>
  );
}
