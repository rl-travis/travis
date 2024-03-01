import { i18nType } from "@/i18n/types";
import { en } from "@/i18n/en";
import { ru } from "@/i18n/ru";
import { useContext } from "react";
import { InternationalizationContext } from "@/providers/InternationalizationProvider";

export const i18nList: i18nType[] = [en, ru];
export function useInter() {
  const { id, setId } = useContext(InternationalizationContext);

  return { i18n: i18nList[id], switchLang: setId };
}
