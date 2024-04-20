import { create } from "zustand";

type SettingsStore = {
  isProfile: boolean;
  isLanguage: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  openLanguage: () => void;
  reset: () => void;
};

export const useSettingsStore = create<SettingsStore>()((set) => ({
  isProfile: false,
  isLanguage: false,
  openProfile: () => set(() => ({ isProfile: true })),
  closeProfile: () => set(() => ({ isProfile: false })),
  openLanguage: () => set(() => ({ isLanguage: true })),
  reset: () => set(() => ({ isLanguage: false, isProfile: false })),
}));
