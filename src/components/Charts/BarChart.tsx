import { Chart, ChartData, ChartOptions, LegendItem } from "chart.js";
import { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";

import zoomPlugin from "chartjs-plugin-zoom";

import ChartsDownloadButton from "../ChartsDownloadButton/ChartsDownloadButton";
import { legendMargin } from "./chartPlugins";
import { useMediaQuery, useTheme } from "@mui/material";
Chart.register(zoomPlugin);

interface SeriesProps {
  data: any[];
  backgroundColor?: string;
  label?: string;
  barThickness?: number;
  barPercentage?: number;
  categoryPercentage?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}
export interface BarChartProps {
  title?: string;
  series: SeriesProps[];
  labels?: string[];
  options?: ChartOptions<"bar">;
  dataUnits?: string;
  timeline?: boolean;
  timeUnit?:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year";
  range?: {
    start: number;
    end: number;
  };
  grouped?: boolean;
  stacked?: boolean;
  grid?: {
    x?: boolean;
    y?: boolean;
  };
  stepSize?: number;
  width?: string | number;
}

export const BarChart = ({
  series,
  labels,
  title,
  options,
  dataUnits,
  timeline,
  timeUnit,
  range,
  grouped,
  stacked,
  grid,
  stepSize,
  width,
}: BarChartProps) => {
  const [data, setData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.up("md"));
  const [columns, setColumns] = useState<any>("");
  const [datas, setDatas] = useState<any>([]);
  const chartRef = useRef(null);
  const setCSVData = (series: SeriesProps[]) => {
    if (!series?.length) {
      return;
    }
    const transformedColumnsData = series.map((s) => {
      return {
        id: s?.label,
        displayName: `${s.label} ${dataUnits ? `(${dataUnits})` : ""}`,
      };
    });
    transformedColumnsData.unshift(
      timeline
        ? {
            id: "timestamp",
            displayName: "Date",
          }
        : {
            id: "index",
            displayName: "",
          }
    );
    const transformedDatas: any[] = [];
    if (grouped) {
      series.forEach((s, i) => {
        const label: string = series[i]?.label || "";
        const seriesData = s?.data;
        seriesData.forEach((d, j) => {
          const timeStamp = timeline
            ? new Date(d?.x).toLocaleDateString()
            : null;

          transformedDatas[j] = {
            ...transformedDatas[j],

            ...(timeline
              ? {
                  timestamp: timeStamp,
                }
              : { index: j }),

            [label]: d?.y,
          };
        });
      });
    } else {
      series.forEach((s, i) => {
        const label: string = series[i]?.label || "";
        const seriesData = s?.data;
        seriesData.forEach((d, j) => {
          const timeStamp = timeline
            ? new Date(d?.x).toLocaleDateString()
            : null;

          transformedDatas[j] = {
            ...transformedDatas[j],
            ...(timeline
              ? {
                  timestamp: timeStamp,
                }
              : { index: j }),
            [label]: d,
          };
        });
      });
    }
    setColumns(transformedColumnsData);
    setDatas(transformedDatas);
  };
  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!title,
        text: title,
      },
      legendMargin: {
        margin: 20,
      },
    },
    scales: {
      x: {
        ...(timeline
          ? {
              type: "time",
              grid: {
                drawOnChartArea: false,
                display: grid?.x,
              },
              time: {
                unit: timeUnit || "day", // use the passed timeUnit

                displayFormats: {
                  month: "MMM",
                },
                tooltipFormat: timeUnit === "hour" ? "HH:mm" : "MMMM, yyyy", // adjust tooltipFormat based on timeUnit
              },
            }
          : {}),

        grid: {
          display: grid?.x,
        },

        border: { display: false },
        offset: true,
        min: range?.start,
        max: range?.end,
        stacked,
      },
      y: {
        ticks: {
          stepSize: stepSize,
        },
        stacked,
        grid: {
          display: grid?.y,
        },
      },
    },
    ...options,
  };
  useEffect(() => {
    setData({
      labels,
      datasets:
        series?.map((el) => ({
          data: el.data,
          label: el.label,
          backgroundColor: el.backgroundColor,
          barThickness: el.barThickness,
          barPercentage: el.barPercentage,
          categoryPercentage: el.categoryPercentage,
          borderRadius: el.borderRadius,
          borderWidth: el.borderWidth,
          borderColor: el.borderColor,
        })) || [],
    });

    setCSVData(series);
  }, [series]);

  return (
    <>
      <Bar
        height={md ? "auto" : 200}
        plugins={[legendMargin]}
        ref={chartRef}
        data={data}
        options={chartOptions}
        style={{
          maxWidth: width || "1000px",
          maxHeight: "390px",
        }}
      />
      <ChartsDownloadButton datas={datas} columns={columns} />
    </>
  );
};
