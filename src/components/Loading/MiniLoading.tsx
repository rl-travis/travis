import React from "react";
import styles from "@/components/Loading/Loading.module.scss";
import { Loader2 } from "lucide-react";

export default function MiniLoading({ className }: { className?: string }) {
  return (
    <Loader2
      size={20}
      color={"#ffffff"}
      className={className ? styles.loader + " " + className : styles.loader}
    />
  );
}
