import axios, { AxiosResponse } from "axios";

import { appConfig } from "../app.config";
import { Descriptor } from "../models/descriptor";
import { DateTime } from "luxon";

const GET_CHANGED_URL = "variable/getChanged";
const GET_AGR_VARIABLE_DATA_URL = "chart/getAgrVariableData";
const GET_STATE = "variable/getState";

export const getDescriptorsMap = (
  aliases: string[]
): Promise<Record<string, Descriptor>> => {
  return axios
    .post(`${appConfig.API_URL}${GET_CHANGED_URL}`, { aliases })
    .then(
      (response: AxiosResponse<{ descriptor: Descriptor }[]>) =>
        response.data
          ?.map((el) => el.descriptor)
          .reduce((p, c) => ({ ...p, [c.alias]: c }), {})
    );
};

export const getAgrVariableData = (
  id: number,
  from: number,
  to: number,
  interval = 512,
  offset = 3600,
  func = "AVG0"
): Promise<{ x: number; y: number }[]> => {
  return axios
    .get(`${appConfig.API_URL}${GET_AGR_VARIABLE_DATA_URL}`, {
      params: {
        id,
        interval,
        from,
        to,
        offset,
        func,
      },
    })
    .then(
      (
        response: AxiosResponse<{
          points: { x: number; y: number }[];
        }>
      ) => response.data?.points
    );
};

export interface DoughnutChartState {
  [key: string]: {
    hasValue: boolean;
    id: number;
    isPending: boolean;
    pendingValue: number | null;
    qualityGood: boolean;
    timeStamp: string;
    value: number;
  };
}

export const getState = (aliases: string[]): Promise<DoughnutChartState> => {
  return axios
    .post(`${appConfig.API_URL}${GET_STATE}`, { aliases })
    .then((response: AxiosResponse<DoughnutChartState>) => response.data);
};
