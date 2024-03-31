"use client";

import React from "react";

import { InternationalizationContext } from "@/6.shared";

export function InternationalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [id, setId] = React.useState(0);

  return (
    <InternationalizationContext.Provider
      value={{
        id,
        setId,
      }}
    >
      {children}
    </InternationalizationContext.Provider>
  );
}
