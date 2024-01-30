import create from "zustand";
import { persist, rehydrate } from "./store";

type SectionStore = {
  [key: string]: any;
  isHidden: (id: string) => boolean;
  setIsHidden: (id: string, hidden: boolean) => void;
};

export const useSectionStore = create<SectionStore>((set, get) => ({
  isHidden: (id) => {
    const state = get();
    if (state[id] !== undefined) return state[id];

    return rehydrate(`${id}`, false);
  },
  setIsHidden: (id, hidden) => {
    set({ [`${id}`]: hidden });

    persist(`${id}`, hidden);
  },
}));
