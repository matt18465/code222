import axios from "axios";

export const setAuthHeader = (accessToken?: string) => {
  axios.defaults.headers["Authorization"] = accessToken
    ? `Bearer ${accessToken}`
    : "";
};
