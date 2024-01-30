import create from "zustand";
import { persist, rehydrate, remove } from "./store";

import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../firebase";

export type TabData = {
  id: string;
  title: string;
  isHidden?: boolean;
  image?: string;
  order?: number;
};
type TabsStore = {
  tabData: TabData[] | null;
  setTabIsHidden: (
    id: string,
    isHidden: boolean,
    activeTabId: string,
    setActiveTabId: (id: string) => void,
    setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  setTabData: (location: string, page: string) => void;
  getTabOrder: (id: string) => number;
  setTabOrder: (id: string, order: number) => void;
  isTabHidden: (id: string) => boolean;
  reorderTabs: (startIndex: number, endIndex: number) => void;
  removeTab: (id: string) => void;
};

export const useTabsStore = create<TabsStore>((set, get) => {
  const getTabList = async (locationId: string, pathName: string) => {
    const tabsCollectionRef = collection(
      db,
      "locations",
      `${locationId}`,
      "pages",
      `${[pathName]}`,
      "tabs"
    );
    try {
      const data = await getDocs(tabsCollectionRef);
      const filteredData = await Promise.all(
        data.docs.map(async (doc) => {
          const id = doc.id;
          const imgPath = doc.data().image;
          const storageRef = ref(storage, imgPath);
          const img = await getDownloadURL(storageRef);
          const { title, isHidden } = doc.data();
          return {
            isHidden,
            title,
            id,
            image: img,
            order: rehydrate(`${doc.id}_order`, data.docs.length),
          };
        })
      );
      if (!filteredData?.length) {
        return null;
      }
      return filteredData.sort((a, b) => a.order - b.order);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    tabData: null,
    setTabData: async (location, page) => {
      await getTabList(location, page).then((data) => {
        return data?.length ? set({ tabData: data }) : set({ tabData: [] });
      });
    },
    removeTab: (id) => {
      remove(`${id}_order`);
      remove(`${id}_hidden`);
    },
    isTabHidden: (id) => {
      return rehydrate(`${id}_hidden`, false);
    },
    setTabIsHidden: (
      id,
      isHidden,
      activeTabId,
      setActiveTabId,
      setHighlightedIndex
    ) => {
      persist(`${id}_hidden`, isHidden);
      set((state) => {
        const newTabData = state?.tabData || [];
        const currentTab = newTabData.find((tab) => tab.id === id);
        if (!currentTab) {
          return state;
        }
        currentTab.isHidden = isHidden;
        // If the tab being hidden is the one being viewed
        if (isHidden && currentTab.id === activeTabId) {
          // Find the first visible tab in the entire array
          const firstVisibleTab = newTabData.find((tab) => !tab.isHidden);
          // Update the active tab's title only if a valid tab is found
          if (firstVisibleTab) {
            setActiveTabId(firstVisibleTab.id);
            // Update the highlighted index
            const newIndex = newTabData.findIndex(
              (tab) => tab?.id === firstVisibleTab.id
            );
            setHighlightedIndex(newIndex);
          }
        }
        return { tabData: newTabData };
      });
    },
    reorderTabs: (startIndex, endIndex) => {
      set((state) => {
        const newTabData = state?.tabData || [];
        const [removed] = newTabData.splice(startIndex, 1);
        newTabData.splice(endIndex, 0, removed);
        newTabData.forEach((tab, index) => {
          tab.order = index;
          persist(`${tab.id}_order`, index);
        });
        return { tabData: newTabData };
      });
    },
    setTabOrder: (id, order) => {
      set((state) => {
        const newTabData = state?.tabData || [];
        const tabWithNewOrder = newTabData.find((tab) => {
          return (tab.id = id);
        });
        if (!tabWithNewOrder) {
          return state;
        }
        tabWithNewOrder.order = order;
        persist(`${id}_order`, order);
        return { tabData: newTabData };
      });
    },
    getTabOrder: (id) => {
      const state = get();
      const tabDateLength = state?.tabData?.length;
      return rehydrate(`${id}_order`, tabDateLength);
    },
  };
});
