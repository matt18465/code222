import React, { useState, createContext, useEffect, useContext } from "react";

import { User } from "../models/user";
import {
  signIn as authSignIn,
  signOut as authSignOut,
} from "../services/auth.service";
import { setAuthHeader } from "../utils/auth";

const CURRENT_USER_STORAGE_KEY = "currentUser";
const ACCESS_TOKEN_STORAGE_KEY = "tokenInfo";

export const AuthContext = createContext<{
  user?: User | null;
  loading?: boolean;
  signIn?: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<User | null>;
  signOut?: () => Promise<void>;
}>({});

interface AuthContextProvideProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProvideProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _tokenInfo = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    const { access_token, tokenExpires } =
      (_tokenInfo && JSON.parse(_tokenInfo)) || {};
    const _token =
      access_token && new Date(tokenExpires) > new Date()
        ? access_token
        : undefined;
    setAuthHeader(_token);
    const _user = _token && localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    setUser((_user && JSON.parse(_user)) || null);
    setLoading(false);
  }, []);

  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const { data } = (await authSignIn(email, password, rememberMe)) || {};
    const { user, access_token, tokenExpires } = data || {};
    setAuthHeader(access_token);
    localStorage.setItem(
      ACCESS_TOKEN_STORAGE_KEY,
      (access_token && JSON.stringify({ access_token, tokenExpires })) || ""
    );
    localStorage.setItem(
      CURRENT_USER_STORAGE_KEY,
      (user && JSON.stringify(user)) || ""
    );
    setUser(user || null);
    return user || null;
  };

  const signOut = async () => {
    await authSignOut();
    setAuthHeader();
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  };

  const value = { user, loading, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
