import create from "zustand";
import { persist, rehydrate, rehydrateDate } from "./store";
import { subMonths } from "date-fns";

type AppStore = {
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
  isTimeModalVisible: boolean;
  toggleTimeModalVisibility: () => void;
  startDate: Date | null;
  endDate: Date | null;
  setTimeRange: (start: Date | null, end: Date | null) => void;
  isNavOpen: boolean;
  setIsNavOpen: (state: boolean) => void;
  toggleNav: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  currentLocation: rehydrate("currentLocation", "Location 1"),
  setCurrentLocation: (location: string) => {
    set({ currentLocation: location });
    persist("currentLocation", location);
  },
  isTimeModalVisible: false,
  toggleTimeModalVisibility: () =>
    set((state) => ({ isTimeModalVisible: !state.isTimeModalVisible })),
  startDate: rehydrateDate("startDate", subMonths(new Date(), 2)),
  endDate: rehydrateDate("endDate", new Date()),

  setTimeRange: (start: Date | null, end: Date | null) => {
    set({ startDate: start, endDate: end });
    if (start) localStorage.setItem("startDate", start.toISOString());
    if (end) localStorage.setItem("endDate", end.toISOString());
  },
  isNavOpen: rehydrate("isNavOpen", true),
  setIsNavOpen: (state: boolean) => {
    set({ isNavOpen: state });
    persist("isNavOpen", state);
  },
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));
