import React from "react";
import styles from "./TextArea.module.scss";

export default function TextArea({
  title,
  maxLength,
  value,
  setValue,
  regex,
}: {
  maxLength: number;
  title: string;
  regex?: RegExp;
  value: string;
  setValue: (s: string) => void;
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [focus, setFocus] = React.useState(false);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `25px`;
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={focus ? styles.wrapper + " " + styles.active : styles.wrapper}>
      <label
        htmlFor={title}
        className={
          focus
            ? styles.labelTop + " " + styles.label
            : value
              ? styles.labelTop + " " + styles.label
              : styles.label + " " + styles.labelCenter
        }
      >
        {title}
      </label>
      <textarea
        className={styles.textarea}
        id={title}
        ref={ref}
        maxLength={maxLength}
        value={value}
        autoComplete="off"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            if (regex) {
              if (regex.test(e.target.value)) {
                setValue(e.target.value);
              }
            } else {
              setValue(e.target.value);
            }
          }
        }}
      />
      <span className={styles.count}>{maxLength - value.length}</span>
    </div>
  );
}
