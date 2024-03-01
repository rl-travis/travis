"use client";

import { useInter } from "@/hooks/useInter";

export default function Home() {
  const { i18n, switchLang } = useInter();
  return (
    <>
      {i18n.test}
      <button onClick={() => switchLang(1)}> писят два</button>
    </>
  );
}
