import styles from "./Textarea.module.scss";
import React, { useEffect, useRef, useState } from "react";

type PropsType = {
  value: string;
  placeholder: string;
  maxSize: number;
  subtitle?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  regex?: RegExp;
};

export default function Textarea({
  subtitle,
  value,
  placeholder,
  setState,
  maxSize,
  regex,
}: PropsType) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `25px`;
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    if (ref.current) ref.current.style.height = "25px";
  }, []);

  function changeValue(value: string) {
    if (value.length <= maxSize && regex && regex.test(value)) setState(value);
    else if (value.length <= maxSize && regex && !regex.test(value))
      setState((prev) => prev);
    else if (value.length <= maxSize) setState(value);
  }

  return (
    <label htmlFor={subtitle} className={styles.label}>
      {!isFocus && !value ? (
        <span className={styles.placeholder}>{placeholder}</span>
      ) : (
        <span className={styles.subtitle}>{subtitle}</span>
      )}
      <textarea
        id={subtitle}
        className={styles.textarea}
        autoComplete={"off"}
        onChange={(event) => changeValue(event.target.value)}
        value={value}
        ref={ref}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <span className={styles.number}>{maxSize - value.length}</span>
    </label>
  );
}