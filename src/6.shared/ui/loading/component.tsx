import cx from "classnames";

import styles from "./component.module.scss";

import { Loader2 } from "lucide-react";

import { IconLogo } from "@/6.shared";

export function Loading() {
  return (
    <div className={styles.wrapper}>
      <IconLogo />
      <Loader2 size={20} className={styles.loader} />
    </div>
  );
}

export function MiniLoading({ className }: { className?: string }) {
  return (
    <Loader2 size={20} color={"#ffffff"} className={cx(styles.loader, className)} />
  );
}
