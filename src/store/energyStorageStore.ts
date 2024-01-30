import create from "zustand";
import { persist, rehydrate } from "./store";

type CardIds =
  | "EnergyStorage-row1-column1"
  | "EnergyStorage-row1-column2"
  | "EnergyStorage-row2-column1"
  | "EnergyStorage-row2-column2"
  | "EnergyStorage-row2-column3"
  | "EnergyStorage-row3-column1"
  | "EnergyStorage-row3-column2";

type EnergyStorageStore = {
  row1Order: CardIds[];
  setRow1Order: (newOrder: CardIds[]) => void;
  row2Order: CardIds[];
  setRow2Order: (newOrder: CardIds[]) => void;
  row3Order: CardIds[];
  setRow3Order: (newOrder: CardIds[]) => void;
};

const ROW1_ORDER_KEY = "energy_storage_row1_order";
const ROW2_ORDER_KEY = "energy_storage_row2_order";
const ROW3_ORDER_KEY = "energy_storage_row3_order";

export const useEnergyStorageStore = create<EnergyStorageStore>((set) => {
  return {
    row1Order: rehydrate(ROW1_ORDER_KEY, [
      "EnergyStorage-row1-column1",
      "EnergyStorage-row1-column2",
    ]),
    setRow1Order: (newOrder) => {
      persist(ROW1_ORDER_KEY, newOrder);
      set({ row1Order: newOrder });
    },
    row2Order: rehydrate(ROW2_ORDER_KEY, [
      "EnergyStorage-row2-column1",
      "EnergyStorage-row2-column2",
      "EnergyStorage-row2-column3",
    ]),
    setRow2Order: (newOrder) => {
      persist(ROW2_ORDER_KEY, newOrder);
      set({ row2Order: newOrder });
    },
    row3Order: rehydrate(ROW3_ORDER_KEY, [
      "EnergyStorage-row3-column1",
      "EnergyStorage-row3-column2",
    ]),
    setRow3Order: (newOrder) => {
      persist(ROW3_ORDER_KEY, newOrder);
      set({ row3Order: newOrder });
    },
  };
});
