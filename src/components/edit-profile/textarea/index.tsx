import React, { useImperativeHandle } from "react";
import styles from "./index.module.scss";
import { Path, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import classNames from "classnames/bind";
import { FormInterface } from "@/components/edit-profile";

const cx = classNames.bind(styles);
export default function Textarea({
  label,
  register,
  maxLength,
  pattern,
  required,
  setValue,
  watch,
  title,
}: {
  label: Path<FormInterface>;
  register: UseFormRegister<FormInterface>;
  maxLength: number;
  pattern?: RegExp;
  required?: boolean;
  setValue?: UseFormSetValue<FormInterface>;
  watch: UseFormWatch<FormInterface>;
  title: string;
}) {
  const [focus, setFocus] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const { ref, ...rest } = register(label, {
    maxLength,
    pattern,
    required,
    onChange: (e) => {
      if (setValue && !e.target.value.match(pattern)) {
        const cur = watch(label) as string;
        setValue(label, cur.slice(0, cur.length - 1));
      } else {
        textareaRef.current!.style.height = `25px`;
        textareaRef.current!.style.height = `${textareaRef.current!.scrollHeight}px`;
      }
    },
    onBlur: () => {
      setFocus(false);
    },
  });
  useImperativeHandle(ref, () => textareaRef.current);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current!.style.height = `53px`;
    }
  }, []);
  return (
    <div
      className={cx(styles.wrapper, {
        active: focus,
      })}
    >
      <label
        htmlFor={label}
        className={cx(styles.label, {
          top: focus || watch(label),
          center: !focus && !watch(label),
        })}
      >
        {title}
      </label>
      <textarea
        tabIndex={1}
        ref={textareaRef}
        id={label}
        maxLength={maxLength}
        className={styles.textarea}
        autoComplete="off"
        onFocus={() => setFocus(true)}
        {...rest}
      ></textarea>
      <span className={styles.count}>
        {maxLength - (watch(label) ? watch(label).toString().length : 0)}
      </span>
    </div>
  );
}
