"use client";
import { InternationalizationContext } from "@/6.shared";
import React, { useState } from "react";

export default function InternationalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [id, setId] = useState(0);

  const changeId = (i: number) => {
    setId(i);
  };

  return (
    <InternationalizationContext.Provider
      value={{
        id,
        setId: changeId,
      }}
    >
      {children}
    </InternationalizationContext.Provider>
  );
}
