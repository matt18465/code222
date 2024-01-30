import { useTheme } from "@mui/material";
import { ChartData, ChartOptions, Plugin } from "chart.js";

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartsDownloadButton from "../ChartsDownloadButton/ChartsDownloadButton";

interface SeriesProps {
  data: number[];
  colors?: string[];
  bgColors?: string[];
  label?: string;
}
interface DoughnutChartProps {
  labels: (string | number)[];
  series: SeriesProps[];
  dataUnits?: string;
  options?: ChartOptions<"doughnut">;
  plugins?: Plugin<"doughnut">[];
}

export const DoughnutChart = ({
  labels,
  series,
  dataUnits,
  options,
  plugins,
}: DoughnutChartProps) => {
  const [data, setData] = useState<ChartData<"doughnut">>({ datasets: [] });
  const [columns, setColumns] = useState<any>("");
  const [datas, setDatas] = useState<any>([]);
  const { palette } = useTheme();

  const setCSVData = (series: SeriesProps[]) => {
    if (!series?.length) {
      return;
    }
    const transformedColumnsData = labels.map((s) => {
      return {
        id: s,
        displayName: `${s} ${dataUnits ? `(${dataUnits})` : ""}`,
      };
    });

    const transformedDatas: any[] = [];
    series.forEach((s, i) => {
      const label: string = series[i]?.label || "";
      const seriesData = s?.data;
      seriesData.forEach((d, j) => {
        transformedDatas[i] = {
          ...transformedDatas[i],
          [labels[j]]: d,
        };
      });
    });

    setColumns(transformedColumnsData);

    setDatas(transformedDatas);
  };
  useEffect(() => {
    setData({
      labels,
      datasets:
        series?.map((el) => ({
          label: el.label,
          data: el.data,
          borderColor: el.colors || "rgba(0,0,0,0)",
          backgroundColor: el.bgColors,
          fill: !!el.bgColors,
        })) || [],
    });
    setCSVData(series);
  }, [series]);

  return (
    <>
      <Doughnut
        data={data}
        plugins={plugins || []}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
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
              filter: ({ label }) => !!label,
            },
          },
          ...options,
        }}
      />
      <ChartsDownloadButton datas={datas} columns={columns} />
    </>
  );
};
