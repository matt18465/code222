import { Box } from "@mui/material";
import { ChartData, Chart as ChartJS } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import ChartsDownloadButton from "../ChartsDownloadButton/ChartsDownloadButton";
interface SeriesProps {
  data: { x: number; y: number }[];
  color?: string;
  label?: string;
  bgColor?: string;
  borderWidth?: number;
  tension?: number;
}
interface SimpleLineChartProps {
  series: SeriesProps;
  dataUnits?: string;
  timeline?: boolean;
}

export const SimpleLineChart = ({
  series,
  timeline,
  dataUnits,
}: SimpleLineChartProps) => {
  const [data, setData] = useState<ChartData<"line">>({ datasets: [] });
  const [columns, setColumns] = useState<any>("");
  const [datas, setDatas] = useState<any>([]);
  const chartRef = useRef<ChartJS<"line"> | undefined>(null);
  const setCSVData = (series: SeriesProps) => {
    if (!series?.data?.length) {
      return;
    }

    const transformedColumnsData = series?.data?.map((s) => {
      return {
        id: "value",
        displayName: `Value ${dataUnits ? `(${dataUnits})` : ""}`,
      };
    });
    transformedColumnsData.unshift({
      id: "timestamp",
      displayName: "Date",
    });
    const transformedDatas: any[] = [];
    series?.data?.forEach((s, i) => {
      const timeStamp = new Date(s?.x).toLocaleDateString();
      transformedDatas[i] = {
        ...transformedDatas[i],
        timestamp: timeStamp,
        value: `${s?.y}`,
      };
    });

    setColumns(transformedColumnsData);

    setDatas(transformedDatas);
  };
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    if (!series) {
      setData({ datasets: [] });
    }
    const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, series.bgColor! || series.color!);
    gradient.addColorStop(1, "#ffffff00");

    setData({
      datasets: [
        {
          label: series.label,
          data: series.data,
          borderColor: series.color,
          backgroundColor: gradient,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: series.borderWidth ?? 1.2,
          tension: series.tension ?? 0,
        },
      ],
    });
    setCSVData(series);
  }, [series]);
  return (
    <>
      <Line
        ref={chartRef}
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: { display: false },
              grid: { display: false },
              border: { display: false },
            },
            x: {
              type: timeline ? "time" : "linear",
              ticks: { display: false },
              grid: { display: false },
              border: { display: false },
            },
          },
          plugins: {
            legend: { display: false },
          },
        }}
      />
      <ChartsDownloadButton
        datas={datas}
        columns={columns}
        styles={{ paddingRight: 0 }}
      />
    </>
  );
};
