import styles from "./component.module.scss";
import { createPortal } from "react-dom";
import React from "react";

export function Portal({
  close,
  children,
  title,
}: {
  close: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      {createPortal(
        <div className={styles.wrapper}>
          <div
            className={styles.overlay}
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          />

          <div className={styles.portal}>
            <h3 className={styles.title}>{title}</h3>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
