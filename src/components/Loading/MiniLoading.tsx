import React from "react";
import styles from "@/components/Loading/Loading.module.scss";
import { Loader2 } from "lucide-react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export default function MiniLoading({ className }: { className?: string }) {
  return (
    <Loader2
      size={20}
      color={"#ffffff"}
      className={cx(styles.loader, {
        className,
      })}
    />
  );
}
