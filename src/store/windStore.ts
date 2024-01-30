import { ReactNode } from "react";
import create from "zustand";

import EnergyStorageSVG from "../assets/images/energy-storage.svg";

type TabData = {
  tabTitle: string;
  visibility: boolean;
  image: string;
};

type WindStore = {
  tabData: TabData[];
  setTabVisibility: (
    index: number,
    visibility: boolean,
    activeTitle: string,
    setActiveTitle: (title: string) => void,
    setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  addNewTab: (title: string, imageSrc: string) => void;
  reorderTabs: (startIndex: number, endIndex: number) => void;
};

export const useWindStore = create<WindStore>((set) => ({
  tabData: [
    {
      tabTitle: "Power section one",
      visibility: true,
      image: EnergyStorageSVG,
    },
    {
      tabTitle: "Voltage frame",
      visibility: true,
      image: EnergyStorageSVG,
    },
    {
      tabTitle: "Amplitudes",
      visibility: true,
      image: EnergyStorageSVG,
    },
    {
      tabTitle: "Example",
      visibility: false,
      image: EnergyStorageSVG,
    },
  ],
  setTabVisibility: (
    index,
    visibility,
    activeTitle,
    setActiveTitle,
    setHighlightedIndex
  ) =>
    set((state) => {
      const newTabData = [...state.tabData];
      newTabData[index].visibility = visibility;

      // If the tab being hidden is the one being viewed
      if (!visibility && newTabData[index].tabTitle === activeTitle) {
        // Find the first visible tab in the entire array
        const firstVisibleTab = newTabData.find((tab) => tab.visibility);
        // Update the active tab's title only if a valid tab is found
        if (firstVisibleTab) {
          setActiveTitle(firstVisibleTab.tabTitle);
          // Update the highlighted index
          const newIndex = newTabData.findIndex(
            (tab) => tab.tabTitle === firstVisibleTab.tabTitle
          );
          setHighlightedIndex(newIndex);
        }
      }
      return { tabData: newTabData };
    }),

  addNewTab: (title, imageSrc) => {
    set((state) => {
      return {
        tabData: [
          ...state.tabData,
          {
            tabTitle: title,
            visibility: true,
            image: imageSrc,
          },
        ],
      };
    });
  },
  reorderTabs: (startIndex, endIndex) => {
    set((state) => {
      const newTabData = [...state.tabData];
      const [removed] = newTabData.splice(startIndex, 1);
      newTabData.splice(endIndex, 0, removed);
      return { tabData: newTabData };
    });
  },
}));
