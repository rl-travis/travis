import React from "react";
import styles from "./Portal.module.scss";
import { createPortal } from "react-dom";
import IconGoogle from "@/components/Icon/IconGoogle";
import IconGithub from "@/components/Icon/IconGithub";
import { Check, X } from "lucide-react";

export default function Portal({
  title,
  close,
  children,
  done,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
  done: () => void;
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
          <div className={styles.block}>
            <div className={styles.title}>{title}</div>
            {children}
            <div className={styles.btns}>
              <button
                className={styles.btn}
                onClick={(e) => {
                  e.preventDefault();
                  close();
                }}
              >
                <X />
              </button>
              <button
                className={styles.btn__accent}
                onClick={(e) => {
                  e.preventDefault();
                  done();
                }}
              >
                <Check />
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
