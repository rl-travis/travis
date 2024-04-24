import React from "react";
import styles from "./component.module.scss";
import Image from "next/image";
import classNames from "classnames/bind";
import { ChevronLeft, ChevronRight } from "lucide-react";
const cx = classNames.bind(styles);
import { v4 as hash } from "uuid";
import { useTheme } from "next-themes";

type StackType = {
  i: string;
  type: "in" | "out" | "no";
  key: string;
};
// два рендера при смене изображения
export function SliderAvatar({ images }: { images: string[] }) {
  const [cur, setCur] = React.useState(0);
  const [can, setCan] = React.useState(true);
  const [stack, setStack] = React.useState<StackType[]>([]);

  const { resolvedTheme } = useTheme();

  const getNext = () => {
    return (cur + 1) % images.length;
  };

  const getPrevCur = () => {
    if (cur === 0) {
      return images.length - 1;
    } else {
      return cur - 1;
    }
  };

  const getPrevPrevCur = () => {
    let q;
    if (cur === 0) {
      q = images.length - 1;
    } else {
      q = cur - 1;
    }
    if (q === 0) {
      return images.length - 1;
    } else {
      return q - 1;
    }
  };

  const next = () => {
    if (can) {
      setCan(false);
      const buffer = [...stack];
      buffer.shift();
      buffer.push({
        key: hash(),
        i: images[getNext()],
        type: "in",
      });
      setStack(buffer);
      setTimeout(() => {
        setCan(true);
        setCur(getNext());
      }, 300);
    }
  };

  const prev = () => {
    if (can) {
      setCan(false);
      const buffer = [...stack];
      buffer.unshift({ i: images[getPrevPrevCur()], type: "no", key: hash() });
      buffer[buffer.length - 1].type = "out";
      setStack(buffer);
      setTimeout(() => {
        buffer.pop();
        setStack(buffer);
        setCan(true);
        setCur(getPrevCur());
      }, 300);
    }
  };

  React.useEffect(() => {
    if (images.length >= 2) {
      setStack([
        { i: images[images.length - 1], type: "no", key: hash() },
        { i: images[0], type: "no", key: hash() },
      ]);
    }
  }, []);

  const imageLoader = () => {
    return resolvedTheme === "dark"
      ? `https://i.ibb.co/SfjCc8Q/dark-square.png?w=500&q=$100`
      : `https://i.ibb.co/Yt94MJN/light-square.png?w=500&q=$100`;
  };

  if (images.length === 1) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <Image
            src={images[0]}
            alt="avatar"
            priority
            className={styles.lower}
            width={0}
            height={0}
            sizes="100vw"
            loader={imageLoader}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Image
          src={images[0]}
          alt="avatar"
          priority
          className={styles.lower}
          width={0}
          height={0}
          sizes="100vw"
          loader={imageLoader}
        />
        {stack.map((image) => {
          return (
            <Image
              key={image.key}
              src={image.i}
              alt="avatar"
              className={cx(styles.image, {
                in: image.type === "in",
                out: image.type === "out",
              })}
              width={0}
              height={0}
              sizes="100vw"
            />
          );
        })}
      </div>
      <div className={styles.btns}>
        <button onClick={prev} className={styles.btn}>
          <ChevronLeft size={30} className={styles.chevron} />
        </button>
        <button onClick={next} className={styles.btn}>
          <ChevronRight size={30} className={styles.chevron} />
        </button>
      </div>
      <div className={styles.count}>
        {cur + 1} / {images.length}
      </div>
    </div>
  );
}
