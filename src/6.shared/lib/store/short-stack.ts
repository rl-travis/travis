import { ShortStackType } from "./types";
import { create } from "zustand";

interface StoreType {
  stack: ShortStackType[];
  add: (b: ShortStackType) => void;
  pop: () => ShortStackType | null;
}
export const useShortStackStore = create<StoreType>()((setState, getState) => ({
  stack: [],
  add: (b) => {
    const s = getState();
    setState({
      stack: [...s.stack, b],
    });
  },
  pop: () => {
    const s = getState();
    const p = s.stack.pop();
    if (p) {
      setState({ stack: s.stack });
      return p;
    } else {
      return null;
    }
  },
}));
