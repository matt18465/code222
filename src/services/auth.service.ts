import { User, UserState } from "../models/user";
import axios, { AxiosResponse } from "axios";

import { appConfig } from "../app.config";

const TOKEN_URL = "token/post";
const SIGN_OUT_URL = "Account/signOut";

export const signIn = async (
  email: string,
  password: string,
  rememberMe: boolean
): Promise<UserState | null> => {
  if (!(email && password)) {
    return null;
  }
  const post = { email, password, rememberMe };
  return await axios
    .post(appConfig.API_URL + TOKEN_URL, post)
    .then((response: AxiosResponse<UserState>) => {
      return (response.data.succeeded && response.data) || null;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const signOut = (): Promise<void> => {
  return axios
    .get(appConfig.API_URL + SIGN_OUT_URL)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
