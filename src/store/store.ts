import create from "zustand";

export const persist = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const remove = (key: string) => {
  window.localStorage.removeItem(key);
};

export const rehydrate = (key: string, defaultValue: any) => {
  const savedValue = window.localStorage.getItem(key);
  return savedValue ? JSON.parse(savedValue) : defaultValue;
};
export const rehydrateDate = (key: string, defaultValue: any) => {
  const value = localStorage.getItem(key);
  return value ? new Date(value) : defaultValue;
};
