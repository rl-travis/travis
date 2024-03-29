import IconLogo from "@/components/Icon/IconLogo";
import React from "react";
import styles from "./Loading.module.scss";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <IconLogo />
      <Loader2 size={20} color={"#ffffff"} className={styles.loader} />
    </div>
  );
}
