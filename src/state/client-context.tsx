import React, { createContext, useEffect, useState } from "react";

import { appConfig } from "../app.config";

const CURRENT_CLIENT_PREFIX_STORAGE_KEY = "currentClientPrefix";

export const ClientContext = createContext<{
  prefix?: string;
  changePrefix?: (prefix: string) => void;
}>({});

interface ClientContextProvideProps {
  children: React.ReactNode;
}

export const ClientContextProvider = ({
  children,
}: ClientContextProvideProps) => {
  const [prefix, setPrefix] = useState<string>("client");

  useEffect(() => {
    const _prefix = localStorage.getItem(CURRENT_CLIENT_PREFIX_STORAGE_KEY);
    setPrefix(_prefix || appConfig.CLIENT_PREFIX);
  }, []);

  const changePrefix = (prefix: string) => {
    localStorage.setItem(CURRENT_CLIENT_PREFIX_STORAGE_KEY, prefix);
    setPrefix(prefix);
  };
  const value = { prefix, changePrefix };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClientContext = () => React.useContext(ClientContext);
