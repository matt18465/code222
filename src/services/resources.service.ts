import axios, { AxiosResponse } from "axios";

import { appConfig } from "../app.config";
import { Resource } from "../models/resource";

const RESOURCES_URL = "Resource/globals";

export const getResources = (): Promise<Resource[]> => {
  return axios
    .get(appConfig.API_URL + RESOURCES_URL)
    .then((response: AxiosResponse<Resource[]>) => response.data);
};
