import { pink } from "@mui/material/colors";
import { useTheme } from "@mui/system";
import { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import ChartsDownloadButton from "../ChartsDownloadButton/ChartsDownloadButton";
import { DateTime } from "luxon";

interface SeriesProps {
  data: number[];
  color: string;
  bgColor?: string;
  label: string;
}
interface RadarChartProps {
  labels: (string | number)[];
  series: SeriesProps[];
  dataUnits?: string;
  timestamps: {
    start: Date;
    avg: Date;
    end: Date;
  }[];
}

export const RadarChart = ({
  labels,
  series,
  dataUnits,
  timestamps,
}: RadarChartProps) => {
  const [data, setData] = useState<ChartData<"radar">>({ datasets: [] });
  const [columns, setColumns] = useState<any>("");
  const [datas, setDatas] = useState<any>([]);
  const { palette } = useTheme();
  const desiredDataPoints = labels.length;
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
    transformedColumnsData.unshift({
      id: "date",
      displayName: "Date",
    });
    const transformedDatas: any[] = [];
    series.forEach((s, i) => {
      const label: string = series[i]?.label || "";
      const seriesData = s?.data;
      seriesData.forEach((d, j) => {
        let timestamp;
        switch (j) {
          case 0:
            timestamp = DateTime.fromJSDate(timestamps[j].start);
            break;
          case timestamps?.length:
            timestamp = DateTime.fromJSDate(timestamps[j].end);
            break;
          default: {
            timestamp = DateTime.fromJSDate(timestamps[j].avg);
          }
        }
        transformedDatas[j] = {
          ...transformedDatas[j],
          date: `${timestamp
            .toLocaleString(DateTime.DATETIME_MED)
            .replace(/, /g, " ")}`,
          [label]: d,
        };
      });
    });
    setColumns(transformedColumnsData);

    setDatas(transformedDatas);
  };
  const aggregateDataPoints = (
    data: number[],
    desiredPoints: number
  ): number[] => {
    const chunkSize = Math.ceil(data.length / desiredPoints);
    return Array.from({ length: desiredPoints }, (_, i) => {
      const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
      return chunk.reduce((a, b) => {
        return a + b;
      }, 0);
    });
  };

  useEffect(() => {
    setData({
      labels,
      datasets:
        series?.map((el) => {
          return {
            label: el.label,
            data: aggregateDataPoints(el.data, desiredDataPoints),
            borderColor: el.color,
            backgroundColor: el.bgColor || `${el.color}33`,
            fill: !!el.bgColor,
          };
        }) || [],
    });
    setCSVData(series);
  }, [series]);
  const allDatasetsAgregated = data.datasets.map((dataset) => dataset.data);
  const allPointsAgregated = allDatasetsAgregated
    ?.flat(1)
    .map((value) => +value!);
  const min = Math.ceil(Math.min(...allPointsAgregated) / 10) * 10;
  const max = Math.ceil(Math.max(...allPointsAgregated) / 10) * 10;
  return (
    <>
      <Radar
        data={data}
        height={"100%"}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
          },
          plugins: {
            legend: {
              display: true,
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
                label(context) {
                  let label = data.datasets[context.datasetIndex].label || "";
                  if (label) {
                    label += ": ";
                  }
                  label += Math.round(context.parsed.r * 100) / 100;
                  return label;
                },
                title: (tooltipItem) => {
                  const index = +tooltipItem[0].dataIndex;
                  const timestamp = timestamps![index];
                  let timestampToDate;
                  switch (index) {
                    case 0:
                      timestampToDate = DateTime.fromJSDate(timestamp?.start);
                      break;
                    case timestamps?.length:
                      timestampToDate = DateTime.fromJSDate(timestamp?.end);
                      break;
                    default: {
                      timestampToDate = DateTime.fromJSDate(timestamp?.avg);
                    }
                  }

                  return timestampToDate.toLocaleString(DateTime.DATETIME_MED);
                },
              },
            },
          },
          scales: {
            r: {
              angleLines: {
                display: true,
                color: pink[100],
              },
              ticks: {
                display: false,
              },
              min: min || -30,
              max: max || 20,
              grid: {
                color: palette.divider,
              },
              pointLabels: {
                color: palette.text.secondary,
              },
            },
          },
        }}
      />
      <ChartsDownloadButton datas={datas} columns={columns} />
    </>
  );
};
