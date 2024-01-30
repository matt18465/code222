import ReactDOMServer from "react-dom/server";
import { green, orange, pink, yellow } from "@mui/material/colors";
import { DateTime } from "luxon";
import { BarChartProps } from "../components/Charts/BarChart";
import Russia from "../assets/images/russia.svg";
import China from "../assets/images/china.svg";
import USA from "../assets/images/usa.svg";
import Canada from "../assets/images/canada.svg";
import Australia from "../assets/images/australia.svg";
import France from "../assets/images/france.svg";
import { Customer } from "../models/customer";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { SvgIconProps } from "@mui/material";
import { ReactNode } from "react";

const WEEKS_IN_A_YEAR = 52;
export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: Math.floor(Math.random() * (600 - 400)) + 400,
    firstName: "Mitchell",
    lastName: "Williamson",
    email: "test@test.com",
  },
  {
    id: Math.floor(Math.random() * (600 - 400)) + 400,
    firstName: "Sam",
    lastName: "Conner",
    email: "test@test.com",
  },
  {
    id: Math.floor(Math.random() * (600 - 400)) + 400,
    firstName: "Christina",
    lastName: "Castro",
    email: "test@test.com",
  },
  {
    id: Math.floor(Math.random() * (600 - 400)) + 400,
    firstName: "Harriett",
    lastName: "Clark",
    email: "test@test.com",
  },
];
export const MOCK_YIELD_FORECAST = [
  {
    label: "Yield",
    color: "#21D59B",
    data: Array.from(Array(WEEKS_IN_A_YEAR), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ weeks: i }).toMillis(),
      y: Math.floor(Math.random() * (600 - 400)) + 400,
    })),
  },
  {
    label: "Forecast",
    color: "#0058FF",
    data: Array.from(Array(WEEKS_IN_A_YEAR), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ weeks: i }).toMillis(),
      y: Math.floor(Math.random() * (600 - 400)) + 400,
    })),
  },
];
export const MOCK_GROWTH = [
  {
    label: "MRR Growth",
    color: "#0058FF",
    backgroundColor: "#0058FF33",
    borderColor: "#0058FF",
    fill: true,
    data: Array.from(Array(WEEKS_IN_A_YEAR), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ weeks: i }).toMillis(),
      y: Math.floor(Math.random() * (900000 - 400)) + 400,
    })),
    yAxisID: "y",
  },
  {
    label: "AVG, MRR/Customers",
    color: "#cfd9e4",
    backgroundColor: "#cfd9e433",
    fill: true,
    data: Array.from(Array(WEEKS_IN_A_YEAR), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ weeks: i }).toMillis(),
      y: Math.floor(Math.random() * (1600 - 400)) + 400,
    })),
    yAxisID: "y1",
  },
];

export const MOCK_SALES_REPORT = [
  {
    data: Array.from(Array(12), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
      y: Math.floor(Math.random() * 80),
    })),
    label: "Expense",
    backgroundColor: "#29cb97",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 0.5,
    categoryPercentage: 0.2,
    borderRadius: 8,
    borderColor: "transparent",
  },

  {
    data: Array.from(Array(12), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
      y: Math.floor(Math.random() * 80),
    })),
    label: "Income",
    backgroundColor: "#0062ff",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 0.6,
    categoryPercentage: 0.6,
    borderRadius: 8,
    borderColor: "transparent",
  },
];

export const MOCK_CUSTOMERS_GROWTH = [
  {
    data: Array.from(Array(12), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
      y: Math.floor(Math.random() * 500),
    })),
    label: "Men",
    backgroundColor: "#0062ff",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 1,
    categoryPercentage: 1,
    borderRadius: 8,
    borderColor: "transparent",
  },

  {
    data: Array.from(Array(12), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
      y: Math.floor(Math.random() * 500),
    })),
    label: "Women",
    backgroundColor: "#57b8ff",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 1,
    categoryPercentage: 1,
    borderRadius: 8,
    borderColor: "transparent",
  },
  {
    data: Array.from(Array(12), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
      y: Math.floor(Math.random() * 500),
    })),
    label: "New Customer",
    backgroundColor: "#d5d7e3",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 1,
    categoryPercentage: 1,
    borderRadius: 8,
    borderColor: "transparent",
  },
];

export const MOCK_CHART_WIDGETS = [
  {
    title: "Year to Date Yield",
    value: "3006.26",
    valueUnit: "GWh",
    change: "1.3%",
    changeNegative: true,
    series: {
      color: "#1FD286",
      data: Array.from(Array(9), (_, i) => ({
        x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
        y: Math.floor(Math.random() * 5),
      })),
    },
  },
  {
    title: "PR",
    value: "95%",
    change: "1.2%",
    changeNegative: true,
    series: {
      color: "#FFC700",
      data: Array.from(Array(9), (_, i) => ({
        x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
        y: Math.floor(Math.random() * 10),
      })),
    },
  },
  {
    title: "AV",
    value: "3,137",
    change: "2.3%",
    series: {
      color: "#1E5EFF",
      bgColor: "#B1D9FF",
      data: Array.from(Array(9), (_, i) => ({
        x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
        y: Math.floor(Math.random() * 10),
      })),
    },
  },
  {
    title: "Visitors this year",
    value: "156,927",
    change: "1.8%",
    series: {
      color: "#1FD286",
      bgColor: "#1FD286",
      borderWidth: 3,
      tension: 0.3,
      data: Array.from(Array(10), (_, i) => ({
        x: DateTime.fromISO("2023-01-01").plus({ month: i }).toMillis(),
        y: Math.floor(Math.random() * 3),
      })),
    },
  },
];

export const DOUGHNUT_1 = {
  labels: ["SOC"],
  series: [
    {
      label: "SOC",
      data: [22.5, 77.5],
      bgColors: [orange[500], "rgba(0, 0, 0, 0.05)"],
    },
  ],
};

export const DOUGHNUT_2 = {
  labels: ["SOH"],
  series: [
    {
      label: "SOH",
      data: [99.6, 0.4],
      bgColors: [green[500], "rgba(0, 0, 0, 0.05)"],
    },
  ],
};

export const LONG_BAR_CHART_MOCK_DATA: BarChartProps = {
  title: "Electricity usage",
  series: [
    {
      label: "Electricity",
      data: Array.from(Array(7)).map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(88,147,40,0.5)",
    },
    {
      label: "AMPS",
      data: Array.from(Array(7)).map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(206,45,131,0.5)",
    },
    {
      label: "VOLTAGE",
      data: Array.from(Array(7)).map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(30,93,138,0.5)",
    },
  ],
  labels: ["January", "February", "March", "April", "May", "June", "July"],
};

export const MAP_LOCATIONS = [
  {
    id: "Location 1",
    position: { lat: 52.752778, lng: 17.841111 },
    imageURL: "https://via.placeholder.com/180x80",
    kW: 158,
    kWp: 55,
    title: "Location 1",
    PR: 95.2,
  },
  {
    id: "Location 2",
    position: { lat: 54.372158, lng: 18.638306 },
    imageURL: "https://via.placeholder.com/180x80",
    kW: 158,
    kWp: 55,
    title: "Location 2",
    PR: 95.2,
  },
  {
    id: "Location 3",
    position: { lat: 54.387036, lng: 18.574631 },
    imageURL: "https://via.placeholder.com/180x80",
    kW: 158,
    kWp: 55,
    title: "Location 3",
    PR: 95.2,
  },
  {
    id: "Location 4",
    position: { lat: 54.331215, lng: 18.652851 },
    imageURL: "https://via.placeholder.com/180x80",
    kW: 158,
    kWp: 55,
    title: "Location 4",
    PR: 95.2,
  },
  {
    id: "Location 5",
    position: { lat: 51.331215, lng: 18.652851 },
    imageURL: "https://via.placeholder.com/180x80",
    kW: 158,
    kWp: 55,
    title: "Location 5",
    PR: 95.2,
  },
];
type Countries = {
  key?: string;
  name: string;
  price: number;
  volume: number;
  flagURL?: string;
};

export const COUNTRIES_DATA: Countries[] = [
  {
    key: "United States",
    name: "United States of America",
    price: 155,
    volume: 3442,
    flagURL: USA,
  },
  {
    name: "Canada",
    price: 140,
    volume: 1530,
    flagURL: Canada,
  },
  {
    name: "Russia",
    price: 134,
    volume: 1147,
    flagURL: Russia,
  },
  {
    name: "China",
    price: 122,
    volume: 765,
    flagURL: China,
  },
  {
    name: "Australia",
    price: 111,
    volume: 382,
    flagURL: Australia,
  },
  {
    name: "France",
    price: 100,
    volume: 382,
    flagURL: France,
  },
];

export default COUNTRIES_DATA;

export const MOCK_ANALYTICS_TRAFFIC_DATA = [
  {
    channels: "Direct",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Call in",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Paid search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Organic search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Email",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Referal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Proposal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Direct",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Call in",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Paid search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Organic search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Email",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Referal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Proposal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Direct",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Call in",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Paid search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Organic search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Email",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Referal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Proposal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Direct",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Call in",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Paid search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Organic search",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Email",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Referal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
  {
    channels: "Proposal",
    sessions: Math.floor(Math.random() * 150000),
    bounce_rate:
      Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    traffic: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
    sales: Math.floor(Math.random() * 3000),
  },
];
type PlantPropertyProps = {
  title?: string;
  color?: string;
  unit?: string;
  today?: number;
  total?: number;
  current?: number;
  icon?: ReactNode;
};
type PlantProps = {
  inverterPower: PlantPropertyProps;
  yields: PlantPropertyProps;
  co2: PlantPropertyProps;
};
export const MOCK_PV_PLANT_OVERVIEW: PlantProps[] = [
  {
    yields: {
      title: "YIELDS",
      today:
        Math.floor(Math.random() * (1000 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      total:
        Math.floor(Math.random() * (100000 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      unit: "MWh",
      color: "#b198bf",
      icon: (
        <ElectricalServicesIcon
          sx={{
            color: "white",
            bgcolor: "#b198bf",
            borderRadius: "50%",
            p: ".2rem",
            float: "left",
          }}
        />
      ),
    },
    co2: {
      title: "CO<sub>2</sub> - AVOIDED",
      today: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      total:
        Math.floor(Math.random() * (100 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      unit: "t",
      color: "#5de8b3",
      icon: (
        <EnergySavingsLeafIcon
          sx={{
            color: "white",
            bgcolor: "#5de8b3",
            borderRadius: "50%",
            p: ".2rem",
            float: "left",
          }}
        />
      ),
    },
    inverterPower: {
      title: "INVERTER POWER",
      current:
        Math.floor(Math.random() * (1000 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      unit: "MW",
      color: "#e5d798",
    },
  },
];

export const MOCK_STATION_OVERVIEW_CONDITIONS = [
  {
    temperature: 25.1,
    wind: 3.8,
  },
];
export const MOCK_STATION_OVERVIEW_CHART = [
  {
    avgRadiation: [
      {
        label: "AVG RADIATION",
        color: orange[500],
        data: Array.from(Array(WEEKS_IN_A_YEAR), (_, i) => ({
          x: DateTime.fromISO("2023-01-01").plus({ weeks: i }).toMillis(),
          y: Math.floor(Math.random() * (1000 - 400)) + 400,
        })),
      },
    ],
  },
];
type StationPropertyProps = {
  title?: string;
  color?: string;
  unit?: string;
  today?: number;
  total?: number;
  current?: number;
};
type StationProps = {
  irradiation: StationPropertyProps;
  inverterPower: StationPropertyProps;
  yield: StationPropertyProps;
  co2: StationPropertyProps;
};
export const MOCK_STATION_OVERVIEW_TABLE: StationProps[] = [
  {
    irradiation: {
      title: "IRRADIATION",
      current:
        Math.floor(Math.random() * (1000 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      unit: "W/m2",
      color: "#e5d798",
    },
    inverterPower: {
      title: "INVERTER POWER",
      current:
        Math.floor(Math.random() * (1000 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      unit: "MW",
      color: "#e5d798",
    },
    yield: {
      title: "YIELD",
      today:
        Math.floor(Math.random() * (1000 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      total:
        Math.floor(Math.random() * (100000 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      unit: "MWh",
      color: "#b198bf",
    },
    co2: {
      title: "CO<sub>2</sub> - AVOIDED",
      today: Math.floor(Math.random() * (10 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      total:
        Math.floor(Math.random() * (100 * 10 - 1 * 10) + 1 * 10) / (1 * 10),
      unit: "t",
      color: "#5de8b3",
    },
  },
];

export const MOCK_INVERTERS_POWER_BAR = [
  {
    data: Array.from(Array(16), (_, i) => Math.floor(Math.random() * 250)),
    label: "Value 1",
    backgroundColor: "#fbd174",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 0.5,
    categoryPercentage: 0.2,
    borderRadius: 8,
    borderColor: "transparent",
  },

  {
    data: Array.from(Array(32), (_, i) => 80),
    label: "Value 2",
    backgroundColor: "#e8e9e9",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 0.6,
    categoryPercentage: 0.6,
    borderRadius: 8,
    borderColor: "transparent",
  },
  {
    data: Array.from(Array(32), (_, i) =>
      i < 16 ? 0 : Math.floor(Math.random() * 250)
    ),
    label: "Value 3",
    backgroundColor: "#f3bdaf",
    barThickness: 15,
    borderWidth: 3,
    barPercentage: 0.6,
    categoryPercentage: 0.6,
    borderRadius: 8,
    borderColor: "transparent",
  },
];

export const MOCK_INVERTERS_POWER_LINE = [
  {
    label: "DAILY POWER YIELDS",
    color: "#21D59B",
    data: Array.from(Array(WEEKS_IN_A_YEAR), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ weeks: i }).toMillis(),
      y: Math.floor(Math.random() * 60),
      y1: Math.floor(Math.random() * 7),
    })),
  },
  {
    label: "INVERTER POWER",
    color: "#0058FF",
    data: Array.from(Array(WEEKS_IN_A_YEAR), (_, i) => ({
      x: DateTime.fromISO("2023-01-01").plus({ weeks: i }).toMillis(),
      y: Math.floor(Math.random() * 60),
      y1: Math.floor(Math.random() * 7),
    })),
  },
];
