import styles from "./component.module.scss";
import React, { useEffect, useRef } from "react";
import { ProfileInfo } from "@/4.features";
import { useStore } from "@/6.shared";
import { SettingsList } from "@/3.widgets/settings/ui/settings-list/component";

export function Settings({ isPending }: { isPending: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const { user } = useStore();

  useEffect(() => {
    ref.current?.animate(
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
    if (isPending) {
      ref.current?.animate(
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
  }, [isPending]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <ProfileInfo doc={user!._id} type={"user"} />
      <SettingsList />
    </div>
  );
}
