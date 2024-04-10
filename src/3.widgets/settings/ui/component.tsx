import styles from "./component.module.scss";
import { useEffect, useRef } from "react";

export function Settings({ isPending }: { isPending: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref!.current!.animate(
        [
          {
            transform: "translateX(-100%)",
          },
          {
            transform: "translateX(0)",
          },
        ],
        200,
      );
    }

    if (isPending) {
      ref!.current!.animate(
        [
          {
            transform: "translateX(0)",
          },
          {
            transform: "translateX(-100%)",
          },
        ],
        200,
      );
    }
  }, [ref.current, isPending]);

  return (
    <div className={styles.wrapper} ref={ref}>
      settings
    </div>
  );
}
