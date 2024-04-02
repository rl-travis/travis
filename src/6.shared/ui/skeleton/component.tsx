import React from "react";
import styles from "./component.module.scss";

/*
  В него нужно передавать только div-элементы, другие не пойдут
  Пример можно увидеть в этой же папке - SkeletonChat.tsx
 */
export function Skeleton({ children }: { children: React.ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export function SkeletonChat() {
  return (
    <Skeleton>
      <div
        style={{
          width: "100%",
          height: 60,
          borderRadius: 10,
          display: "flex",
          padding: 10,
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            flex: 1,
            height: 30,
            borderRadius: 10,
          }}
        />
      </div>
    </Skeleton>
  );
}

type SkeletonMessageType = {
  width: number;
  isGroup: boolean;
  isReply: boolean;
};

export function SkeletonMessage({ width, isGroup, isReply }: SkeletonMessageType) {
  return (
    <>
      {isGroup && !isReply && (
        <Skeleton>
          <div
            style={{
              maxWidth: width,
              width: "100%",
              height: 90,
              borderRadius: 5,
              padding: 10,
              gap: 10,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                flex: 1,
                borderRadius: 10,
                height: 70,
              }}
            ></div>
          </div>
        </Skeleton>
      )}
      {isReply && !isGroup && (
        <Skeleton>
          <div
            style={{
              maxWidth: width,
              width: "100%",
              height: 90,
              borderRadius: 5,
              padding: 10,
              gap: 10,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 10,
                height: 70,
                padding: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderRadius: 10,
                  height: 30,
                }}
              ></div>
            </div>
          </div>
        </Skeleton>
      )}
      {isReply && isGroup && (
        <Skeleton>
          <div
            style={{
              maxWidth: width,
              width: "100%",
              height: 90,
              borderRadius: 5,
              padding: 10,
              gap: 10,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                flex: 1,
                borderRadius: 10,
                height: 70,
                padding: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderRadius: 10,
                  height: 30,
                }}
              ></div>
            </div>
          </div>
        </Skeleton>
      )}
      {!isReply && !isGroup && (
        <Skeleton>
          <div
            style={{
              maxWidth: width,
              width: "100%",
              height: 90,
              borderRadius: 5,
              padding: 10,
              gap: 10,
              display: "flex",
              alignItems: "flex-end",
            }}
          ></div>
        </Skeleton>
      )}
    </>
  );
}
