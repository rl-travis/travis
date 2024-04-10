import React from "react";
import styles from "./component.module.scss";
import Image from "next/image";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export function SliderAvatar({ images }: { images: string[] }) {
  const [cur, setCur] = React.useState(0);
  const [next, setNext] = React.useState(false);
  const [prev, setPrev] = React.useState(false);
  const getImage = (next: boolean) => {
    if (next) return cur + 1 >= images.length ? images[0] : images[cur + 1];
    else return cur - 1 < 0 ? images[images.length - 1] : images[cur - 1];
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Image
          src={getImage(false)}
          alt="prev"
          width={0}
          height={0}
          sizes="100vw"
          className={cx(styles.image, styles.prev, {
            animation: prev,
          })}
        />
        <Image
          src={images[cur]}
          alt="cur"
          width={0}
          height={0}
          sizes="100vw"
          className={cx(styles.image)}
        />
        <Image
          src={getImage(true)}
          alt="next"
          width={0}
          height={0}
          sizes="100vw"
          className={cx(styles.image, styles.next, {
            animation: next,
          })}
        />
      </div>
      <button
        onClick={() => {
          setPrev(true);
          setTimeout(() => {
            setPrev(false);
            setCur(cur + 1 >= images.length ? 0 : cur + 1);
          }, 300);
        }}
      >
        prev
      </button>
      <button onClick={() => setNext(true)}>next</button>
    </div>
  );
}
