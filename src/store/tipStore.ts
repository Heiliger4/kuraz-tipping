import { create } from "zustand";

interface TipState {
  tip: number | null;
  isRandom: boolean;
  setTip: (val: number | null, isRandom?: boolean) => void;
  resetRandom: () => void;
}

export const useTipStore = create<TipState>((set) => ({
  tip: null,
  isRandom: false,
  setTip: (val, isRandom = false) => set({ tip: val, isRandom }),
  resetRandom: () => set({ isRandom: false }),
}));
