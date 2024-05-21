import { Fragment } from "react";

import cx from "classnames";

import { emojis, internal, native } from "../lib";

import styles from "./emoji-list.module.scss";
import { v4 as hash } from "uuid";

import { Loading, useChatStore, useLocalStorage } from "@/6.shared";

function RenderEmoji({ nativeEmoji, emoji }: { nativeEmoji: boolean; emoji: string }) {
  if (nativeEmoji) return <div className={styles.native}>{native(emoji)}</div>;
  return <img src={internal(emoji)} alt={emoji} className={styles.internal} />;
}

function VariantEmoji({
  variants,
  handleEmoji,
  nativeEmoji,
  left,
}: {
  variants?: string[];
  handleEmoji: (e: string) => void;
  nativeEmoji: boolean;
  left: boolean;
}) {
  if (!variants) return;
  return (
    <div
      className={cx(styles.variants, {
        [styles.left]: left,
      })}
    >
      {variants.map((e) => {
        return (
          <div
            key={hash()}
            className={styles.btn}
            onClick={(event) => {
              event.stopPropagation();
              handleEmoji(native(e));
            }}
          >
            <RenderEmoji nativeEmoji={nativeEmoji} emoji={e} />
          </div>
        );
      })}
    </div>
  );
}

export function EmojiList({ mobile }: { mobile?: boolean }) {
  const { statusSidebar, addEmoji } = useChatStore();
  const { nativeEmoji } = useLocalStorage();

  const handleEmoji = (emoji: string) => addEmoji(emoji);

  if (statusSidebar !== "emoji") {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      {Object.keys(emojis).map((group) => {
        return (
          <Fragment key={group}>
            <div className={styles.top}>{group}</div>
            <div className={styles.group}>
              {emojis[group].map((emoji, index) => {
                return (
                  <button
                    key={hash()}
                    className={cx(styles.btn, {
                      [styles.has]: !!emoji.v && !mobile,
                    })}
                    onClick={() => {
                      handleEmoji(native(emoji.u));
                    }}
                  >
                    <VariantEmoji
                      handleEmoji={handleEmoji}
                      nativeEmoji={nativeEmoji}
                      variants={emoji.v}
                      left={index % 8 >= 4}
                    />
                    <RenderEmoji nativeEmoji={nativeEmoji} emoji={emoji.u} />
                  </button>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
