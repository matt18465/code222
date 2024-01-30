import React, { Dispatch } from "react";

import create from "zustand";
import { persist, rehydrate } from "./store";

import { SectionTitles } from "../models/sections";

export type CardIds =
  | "home-row1-column1"
  | "home-row1-column2"
  | "home-row1-column3"
  | "home-row2-column1"
  | "home-row2-column2"
  | "home-row3-column1"
  | "home-row3-column2";

type HomeStore = {
  sections: SectionTitles[];
  moveUp: (title: SectionTitles) => void;
  moveDown: (title: SectionTitles) => void;
  selectedSection: SectionTitles | null;
  selectSection: (title: SectionTitles) => void;
  row1Order: CardIds[];
  row2Order: CardIds[];
  row3Order: CardIds[];
  setRow1Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
  setRow2Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
  setRow3Order: React.Dispatch<React.SetStateAction<CardIds[]>>;
};

const STORAGE_KEY = "sections_order";
const ROW1_ORDER_KEY = "row1_order";
const ROW2_ORDER_KEY = "row2_order";
const ROW3_ORDER_KEY = "row3_order";

export const useHomeStore = create<HomeStore>((set) => ({
  sections: rehydrate(STORAGE_KEY, [
    "Overview - all power plants",
    "ESS Schedule",
    "Geo & Visitors",
    "Sales & Generation",
  ]),
  selectedSection: null,
  row1Order: rehydrate(ROW1_ORDER_KEY, [
    "home-row1-column1",
    "home-row1-column2",
    "home-row1-column3",
  ]),
  row2Order: rehydrate(ROW2_ORDER_KEY, [
    "home-row2-column1",
    "home-row2-column2",
  ]),
  row3Order: rehydrate(ROW3_ORDER_KEY, [
    "home-row3-column1",
    "home-row3-column2",
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
}));
