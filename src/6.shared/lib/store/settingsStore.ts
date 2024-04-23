import { create } from "zustand";

type SettingsStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
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
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
  openProfile: () => set(() => ({ isProfile: true })),
  closeProfile: () => set(() => ({ isProfile: false })),
  openLanguage: () => set(() => ({ isLanguage: true })),
  reset: () => set(() => ({ isLanguage: false, isProfile: false })),
}));
