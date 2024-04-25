import { SettingsMenuType } from "./types";
import { create } from "zustand";

interface StoreType {
  openSettings: boolean;
  setOpenSettings: (b: boolean) => void;
  menuSettings: SettingsMenuType;
  setMenuSettings: (b: SettingsMenuType) => void;
}

export const useSettingsStore = create<StoreType>()((setState) => ({
  openSettings: false,
  setOpenSettings: (b) => {
    if (!b) setState({ menuSettings: null });
    setState({ openSettings: b });
  },
  menuSettings: null,
  setMenuSettings: (b) => setState({ menuSettings: b }),
}));
