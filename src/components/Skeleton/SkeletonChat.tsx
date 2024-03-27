import React from "react";
import Skeleton from "@/components/Skeleton/Skeleton";

export default function SkeletonChat() {
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
