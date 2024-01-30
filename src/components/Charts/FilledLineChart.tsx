import React, { useEffect, useState, useRef } from "react";
import { Box, useTheme } from "@mui/system";
import { Chart, ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import ZoomSlider from "../ZoomSlider/ZoomSlider";
import { hoverLine, legendMargin } from "./chartPlugins";
import ChartsDownloadButton from "../ChartsDownloadButton/ChartsDownloadButton";
import { useMediaQuery } from "@mui/material";

Chart.register(zoomPlugin);
interface SeriesProps {
  data: { x: number; y: number }[];
  color: string;
  label?: string;
  fill?: boolean;
  backgroundColor?: string;
  yAxisID?: string;
}
interface FilledLineChartProps {
  series: SeriesProps[];
  lineTension?: number;
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
  dataUnits?: string;
  verticalScales?: {
    y?: {
      min: number;
      max: number;
    };
    y1?: {
      min: number;
      max: number;
    };
  };
  tooltipFormat?: string;
  grid?: boolean;
  options?: ChartOptions<"line">;
}
export const FilledLineChart = ({
  series,
  lineTension,
  timeline,
  timeUnit,
  dataUnits,
  verticalScales,
  tooltipFormat,
  grid,
}: FilledLineChartProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  let chartRef = useRef(null);
  const [data, setData] = useState<ChartData<"line">>({ datasets: [] });
  const { palette } = useTheme();
  const chart: any = chartRef?.current;
  const [columns, setColumns] = useState<any>("");
  const [datas, setDatas] = useState<any>([]);
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.up("md"));
  const setCSVData = (series: SeriesProps[]) => {
    if (!series?.length) {
      return;
    }

    const transformedColumnsData = series.map((s) => {
      return {
        id: s.label,
        displayName: `${s.label} ${dataUnits ? `(${dataUnits})` : ""}`,
      };
    });
    transformedColumnsData.unshift({
      id: "timestamp",
      displayName: "Date",
    });
    const transformedDatas: any[] = [];
    series.forEach((s, i) => {
      const label: string = series[i]?.label || "";
      const seriesData = s?.data;
      seriesData.forEach((d, j) => {
        const timeStamp = new Date(d?.x).toLocaleDateString();
        transformedDatas[j] = {
          ...transformedDatas[j],
          timestamp: timeStamp,
          [label]: `${d?.y}`,
        };
      });
    });

    setColumns(transformedColumnsData);

    setDatas(transformedDatas);
  };
  useEffect(() => {
    chart?.zoom({ x: zoomLevel, y: 1 }, "x");
  }, [zoomLevel]);
  useEffect(() => {
    setData({
      datasets:
        series?.map((el) => ({
          label: el.label,
          data: el.data,
          borderColor: el.color,
          backgroundColor: el.backgroundColor,
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 2,
          fill: el.fill,
          yAxisID: el.yAxisID,
        })) || [],
    });
    setCSVData(series);
  }, [series]);
  return (
    <Box
      sx={{
        height: {
          xs: 250,
          md: 350,
          xl: 450,
        },
        maxHeight: "85%",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        px: {
          xs: 0,
          md: 2,
          xl: "initial",
        },
        maxWidth: 1,
        gap: {
          xs: 0,
          md: ".5rem",
          xl: "3rem",
        },
        justifyContent: {
          xs: "center",
          xl: "flex-start",
        },
        alignItems: "center",
      }}
    >
      {" "}
      <Line
        ref={chartRef}
        data={data}
        plugins={[hoverLine, legendMargin]}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            axis: "x",
            intersect: false,
          },
          scales: {
            x: {
              display: false,
              grid: { display: grid },
              type: timeline ? "time" : "linear",
              ...(timeline
                ? {
                    time: {
                      unit: timeUnit,
                      tooltipFormat: tooltipFormat,
                    },
                  }
                : {}),
            },
            y: {
              display: false,
              type: "linear",

              grid: { display: grid },
              min: verticalScales?.y?.min,
              max: verticalScales?.y?.max,
              ticks: {
                stepSize: 50,
              },
              position: "left",
            },
          },
          elements: {
            line: {
              tension: lineTension || 0,
            },
          },
          plugins: {
            legendMargin: {
              margin: md ? 180 : 50,
            },

            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                  modifierKey: "ctrl",
                },
                mode: "x",
                onZoomComplete: async ({ chart }) => {},
              },
            },
            legend: {
              align: "end",

              labels: {
                usePointStyle: true,
                boxHeight: 7,
                padding: 40,
                color: palette.text.primary,
              },
            },

            tooltip: {
              backgroundColor: palette.background.paper,
              titleColor: palette.text.primary,
              bodyColor: palette.text.primary,
              borderWidth: 1,
              borderColor: palette.divider,
              usePointStyle: true,
              boxHeight: 7,
              padding: 10,
              xAlign: "center",
              callbacks: {
                label: (tooltipItem) => {
                  return `$${tooltipItem.formattedValue}`;
                },
              },
            },
          },
        }}
        style={{
          maxWidth: "92%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "1",
          justifyContent: "flex-end",
          marginLeft: {
            xs: "auto",
            lg: "initial",
          },
          p: {
            xs: 2,
            lg: "initial",
          },
          gap: "2rem",
          "& div[role='button']": {
            paddingRight: "0!important",
            alignSelf: "center!important",
          },
        }}
      >
        {md ? (
          <ZoomSlider zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
        ) : (
          ""
        )}
        <ChartsDownloadButton datas={datas} columns={columns} />
      </Box>
    </Box>
  );
};
