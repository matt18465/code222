import React, { Dispatch } from "react";

import create from "zustand";
import { persist, rehydrate } from "./store";

import { SectionTitles } from "../models/sections";
export type CardIds =
  | "location-row1-column1"
  | "location-row1-column2"
  | "location-row2-column1"
  | "location-row2-column2"
  | "location-row2-column3"
  | "location-row3-column1"
  | "location-row3-column2"
  | "location-row3-column3"
  | "location-row4-column1"
  | "location-row4-column2"
  | "location-row4-column3"
  | "location-row5-column1"
  | "location-row5-column2";

type LocationStore = {
  sections: SectionTitles[];
  moveUp: (title: SectionTitles) => void;
  moveDown: (title: SectionTitles) => void;
  selectedSection: SectionTitles | null;
  selectSection: (title: SectionTitles) => void;
  row1Order: CardIds[];
  row2Order: CardIds[];
  row3Order: CardIds[];
  row4Order: CardIds[];
  row5Order: CardIds[];
  setRow1Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
  setRow2Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
  setRow3Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
  setRow4Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
  setRow5Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
};

const STORAGE_KEY = "location_sections_order";
const ROW1_ORDER_KEY = "location_row1_order";
const ROW2_ORDER_KEY = "location_row2_order";
const ROW3_ORDER_KEY = "location_row3_order";
const ROW4_ORDER_KEY = "location_row4_order";
const ROW5_ORDER_KEY = "location_row5_order";

export const useLocationStore = create<LocationStore>((set) => ({
  sections: rehydrate(STORAGE_KEY, [
    "SCADA - PLANT OVERVIEW",
    "PV PERFORMANCE",
    "WIND PERFORMANCE",
    "ESS PERFORMANCE",
    "Event log & FrontGate",
    "ESS Schedule",
    "BMS Configuration",
    "ESS Parameters",
  ]),
  selectedSection: null,
  row1Order: rehydrate(ROW1_ORDER_KEY, [
    "location-row1-column1",
    "location-row1-column2",
  ]),
  row2Order: rehydrate(ROW2_ORDER_KEY, [
    "location-row2-column1",
    "location-row2-column2",
    "location-row2-column3",
  ]),
  row3Order: rehydrate(ROW3_ORDER_KEY, [
    "location-row3-column1",
    "location-row3-column2",
    "location-row3-column3",
  ]),
  row4Order: rehydrate(ROW4_ORDER_KEY, [
    "location-row4-column1",
    "location-row4-column2",
    "location-row4-column3",
  ]),
  row5Order: rehydrate(ROW5_ORDER_KEY, [
    "location-row5-column1",
    "location-row5-column2",
  ]),
  selectSection: (title) => {
    set({ selectedSection: title });
  },
  moveUp: (title) => {
    set((state) => {
      const index = state.sections.indexOf(title);
      if (index > 0) {
        const newArr = [...state.sections];
        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
        persist(STORAGE_KEY, newArr); // Persist to localStorage
        return { sections: newArr, selectedSection: title };
      }
      return {};
    });
  },
  moveDown: (title) => {
    set((state) => {
      const index = state.sections.indexOf(title);
      if (index < state.sections.length - 1) {
        const newArr = [...state.sections];
        [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
        persist(STORAGE_KEY, newArr);
        return { sections: newArr, selectedSection: title };
      }
      return {};
    });
  },
  setRow1Order: (newOrder) => {
    set((state) => {
      const updatedOrder =
        typeof newOrder === "function" ? newOrder(state.row1Order) : newOrder;
      persist(ROW1_ORDER_KEY, updatedOrder);
      return { row1Order: updatedOrder };
    });
  },
  setRow2Order: (newOrder) => {
    set((state) => {
      const updatedOrder =
        typeof newOrder === "function" ? newOrder(state.row2Order) : newOrder;
      persist(ROW2_ORDER_KEY, updatedOrder);
      return { row2Order: updatedOrder };
    });
  },
  setRow3Order: (newOrder) => {
    set((state) => {
      const updatedOrder =
        typeof newOrder === "function" ? newOrder(state.row3Order) : newOrder;
      persist(ROW3_ORDER_KEY, updatedOrder);
      return { row3Order: updatedOrder };
    });
  },
  setRow4Order: (newOrder) => {
    set((state) => {
      const updatedOrder =
        typeof newOrder === "function" ? newOrder(state.row4Order) : newOrder;
      persist(ROW4_ORDER_KEY, updatedOrder);
      return { row4Order: updatedOrder };
    });
  },

  setRow5Order: (newOrder) => {
    set((state) => {
      const updatedOrder =
        typeof newOrder === "function" ? newOrder(state.row5Order) : newOrder;
      persist(ROW5_ORDER_KEY, updatedOrder);
      return { row5Order: updatedOrder };
    });
  },
}));
