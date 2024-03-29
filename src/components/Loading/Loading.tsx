import React from "react";
import styles from "./Loading.module.scss";
import { Loader2 } from "lucide-react";
import { IconLogo } from "@/6.shared";
export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <IconLogo />
      <Loader2 size={20} className={styles.loader} />
    </div>
  );
}
