import { useState } from "react";
import { ChartOptions } from "chart.js";
import { DateTime } from "luxon";
import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";

import { BarChart } from "../../../../components/Charts/BarChart";
import {
  getAgrVariableData,
  getDescriptorsMap,
} from "../../../../services/metrics.service";

const BAR_CHART_METRICS = {
  series1: "ALU_FROST.00_RSN.Pc",
  series2: "ALU_FROST.Storage.Schedule.load_forecast_power",
  series3: "ALU_FROST.00_RSN.Pp",
  series4: "ALU_FROST.Storage.Schedule.generation_forecast_power",
  series5: "ALU_FROST.01_BESS_1.INV1.MEASUREMENTS.P",
  series6: "ALU_FROST.Storage.Schedule.operation_plan_storage_power",
};
const BAR_METRIC_ALIASES = Object.values(BAR_CHART_METRICS);

export const PowerBarChart = () => {
  const [barChartRange, setBarChartRange] = useState<[DateTime, DateTime]>([
    DateTime.now().startOf("day"),
    DateTime.now().endOf("day"),
  ]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: false,
    },
    hover: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    animation: {
      duration: 500,
    },
    elements: {
      line: {
        tension: 0.3,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "[kWh]",
        },
      },
      x: {},
    },
  };

  const chartLabels = Array.from({ length: 24 }, (_, i) =>
    DateTime.now().startOf("day").plus({ hours: i }).toFormat("HH:mm")
  );

  const { data: descriptorsMap } = useQuery(["powerBarDescriptors"], () =>
    getDescriptorsMap(BAR_METRIC_ALIASES)
  );

  const { data: series1 } = useQuery(
    ["powerChartSeries1", barChartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![BAR_CHART_METRICS.series1].id,
        barChartRange[0].toMillis(),
        barChartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[BAR_CHART_METRICS.series1] }
  );

  const { data: series2 } = useQuery(
    ["powerChartSeries2", barChartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![BAR_CHART_METRICS.series2].id,
        barChartRange[0].toMillis(),
        barChartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[BAR_CHART_METRICS.series2] }
  );

  const { data: series3 } = useQuery(
    ["powerChartSeries3", barChartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![BAR_CHART_METRICS.series3].id,
        barChartRange[0].toMillis(),
        barChartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[BAR_CHART_METRICS.series3] }
  );

  const { data: series4 } = useQuery(
    ["powerChartSeries4", barChartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![BAR_CHART_METRICS.series4].id,
        barChartRange[0].toMillis(),
        barChartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[BAR_CHART_METRICS.series4] }
  );

  const { data: series5 } = useQuery(
    ["powerChartSeries5", barChartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![BAR_CHART_METRICS.series5].id,
        barChartRange[0].toMillis(),
        barChartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[BAR_CHART_METRICS.series5] }
  );

  const { data: series6 } = useQuery(
    ["powerChartSeries6", barChartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![BAR_CHART_METRICS.series6].id,
        barChartRange[0].toMillis(),
        barChartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[BAR_CHART_METRICS.series6] }
  );

  const chartSeries = [
    {
      label: "Consumption",
      data: series1?.map((item) => item.y) || [],
      backgroundColor: "rgba(222, 91, 91)",
    },
    {
      label: "Load forecast",
      data: series2?.map((item) => item.y) || [],
      backgroundColor: "rgba(255, 134, 111)",
    },
    {
      label: "PV Generation",
      data: series3?.map((item) => item.y) || [],
      backgroundColor: "rgba(253, 249, 0  )",
    },
    {
      label: "PV Generation forecast",
      data: series4?.map((item) => item.y) || [],
      backgroundColor: "rgba( 255, 253, 149 )",
    },
    {
      label: "BESS Generation",
      data: series5?.map((item) => item.y) || [],
      backgroundColor: "rgba(192, 255, 0)",
    },
    {
      label: "BESS Schedule",
      data: series5?.map((item) => item.y) || [],
      backgroundColor: "rgba(159, 211, 0)",
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <DatePicker
        inputFormat="dd-MM-yyyy"
        value={barChartRange[0]}
        onChange={(newValue: DateTime | null) => {
          if (!newValue) {
            return;
          }
          setBarChartRange([newValue.startOf("day"), newValue.endOf("day")]);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <BarChart
        options={options}
        series={chartSeries}
        labels={chartLabels}
        dataUnits="kWh"
      />
    </Box>
  );
};
