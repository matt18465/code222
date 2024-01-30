import React, { useEffect, useState, useRef } from "react";
import { Box, useTheme } from "@mui/system";
import { Chart, ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import ZoomSlider from "../ZoomSlider/ZoomSlider";
import { hoverLine } from "./chartPlugins";
import ChartsDownloadButton from "../ChartsDownloadButton/ChartsDownloadButton";
import { useMediaQuery } from "@mui/material";

Chart.register(zoomPlugin);
interface SeriesProps {
  data: { x: number; y: number }[];
  color: string;
  label?: string;
}
interface LineChartProps {
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
  verticalScale?: {
    min: number;
    max: number;
  };
  height?: number;
  tooltipFormat?: string;
  disableZoomSlider?: boolean;
  options?: ChartOptions<"line">;
}
export const LineChart = ({
  series,
  lineTension,
  timeline,
  timeUnit,
  dataUnits,
  verticalScale,
  tooltipFormat,
  height,
  disableZoomSlider,
  options,
}: LineChartProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  let chartRef = useRef(null);
  const [data, setData] = useState<ChartData<"line">>({ datasets: [] });
  const { palette } = useTheme();
  const chart: any = chartRef?.current;
  const [columns, setColumns] = useState<any>("");
  const [datas, setDatas] = useState<any>([]);
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.up("md"));
  const xl = useMediaQuery(breakpoints.up("xl"));
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
          backgroundColor: el.color,
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 2,
        })) || [],
    });
    setCSVData(series);
  }, [series]);
  return (
    <Box
      sx={{
        height: height || 390,
        maxHeight: height || "85%",
        display: "flex",
        maxWidth: "1",
        gap: {
          xs: 0,
          md: "2rem",
        },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <Line
        ref={chartRef}
        data={data}
        plugins={[hoverLine]}
        options={{
          responsive: true,
          maintainAspectRatio: !xl,
          interaction: {
            mode: "index",
            axis: "x",
            intersect: false,
          },
          scales: {
            x: {
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
              ...(dataUnits
                ? {
                    title: {
                      display: true,
                      text: `[${dataUnits}]`,
                    },
                  }
                : {}),

              min: verticalScale?.min,
              max: verticalScale?.max,
              ticks: {
                stepSize: 50,
              },
            },
          },
          elements: {
            line: {
              tension: lineTension || 0,
            },
          },
          plugins: {
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
              labels: {
                usePointStyle: true,
                boxHeight: 7,
                padding: 20,
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
                  return ` ${tooltipItem.dataset.label}: ${
                    tooltipItem.formattedValue
                  } ${dataUnits ?? ""}`;
                },
              },
            },
          },
          ...options,
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
          gap: "2rem",
          "& div[role='button']": {
            paddingRight: "0!important",
            alignSelf: "center!important",
          },
        }}
      >
        {md && !disableZoomSlider ? (
          <ZoomSlider zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
        ) : (
          ""
        )}
        <ChartsDownloadButton datas={datas} columns={columns} />
      </Box>
    </Box>
  );
};
