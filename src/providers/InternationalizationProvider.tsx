"use client";
import React, { createContext, useState } from "react";

type InternationalizationContextType = {
  id: number;
  setId: (id: number) => void;
};

export const InternationalizationContext =
  createContext<InternationalizationContextType>({
    id: 0,
    setId: (_) => {},
  });

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
