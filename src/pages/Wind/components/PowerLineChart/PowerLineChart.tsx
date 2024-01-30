import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { LineChart } from "../../../../components/Charts/LineChart";
import { useClientContext } from "../../../../state/client-context";
import {
  getAgrVariableData,
  getDescriptorsMap,
} from "../../../../services/metrics.service";
import { MOCK_YIELD_FORECAST } from "../../../../mocks/mocks";
export const PowerLineChart = () => {
  const [chartRange, setChartRange] = useState<[DateTime, DateTime]>([
    DateTime.now().startOf("month"),
    DateTime.now().endOf("month"),
  ]);
  const { prefix: clientPrefix } = useClientContext();

  const CHART_METRICS = {
    series1: clientPrefix + ".00_RSN.Pp",
    series2: clientPrefix + ".01_BESS_1.INV1.MEASUREMENTS.P",
    series3: clientPrefix + ".00_RSN.Pc",
  };

  const METRIC_ALIASES = Object.values(CHART_METRICS);

  const { data: descriptorsMap } = useQuery(["powerLineChartDescriptors"], () =>
    getDescriptorsMap(METRIC_ALIASES)
  );

  const { data: series1 } = useQuery(
    ["PLSeries1", chartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![CHART_METRICS.series1].id,
        chartRange[0].toMillis(),
        chartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[CHART_METRICS.series1] }
  );

  const { data: series2 } = useQuery(
    ["PLSeries2", chartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![CHART_METRICS.series2].id,
        chartRange[0].toMillis(),
        chartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[CHART_METRICS.series2] }
  );

  const { data: series3 } = useQuery(
    ["PLSeries3", chartRange],
    () =>
      getAgrVariableData(
        descriptorsMap![CHART_METRICS.series3].id,
        chartRange[0].toMillis(),
        chartRange[1].toMillis()
      ),
    { enabled: !!descriptorsMap?.[CHART_METRICS.series3] }
  );

  const chartSeries = [
    {
      label: "PV POWER",
      color: "#e66e28",
      data:
        series1?.map((item) => ({
          x: item.x,
          y: item.y,
        })) || [],
    },
    {
      label: "BESS POWER",
      color: "#19841a",
      data:
        series2?.map((item) => ({
          x: item.x,
          y: item.y,
        })) || [],
    },
    {
      label: "CONSUMPTION POWER",
      color: "#1e7cb2",
      data:
        series3?.map((item) => ({
          x: item.x,
          y: item.y,
        })) || [],
    },
  ];

  const extraOptions = [];

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: {
              xs: ".7rem",
              md: "1rem",
            },
          }}
        >
          Date from
        </Typography>
        <DatePicker
          inputFormat="dd-MM-yyyy"
          value={chartRange[0]}
          onChange={(newValue: DateTime | null) => {
            if (!newValue) {
              return;
            }
            setChartRange([newValue.startOf("day"), chartRange[1]]);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Typography
          component={"span"}
          sx={{
            fontSize: {
              xs: ".7rem",
              md: "1rem",
            },
          }}
        >
          to
        </Typography>
        <DatePicker
          inputFormat="dd-MM-yyyy"
          value={chartRange[1]}
          onChange={(newValue: DateTime | null) => {
            if (!newValue) {
              return;
            }
            setChartRange([chartRange[0], newValue.endOf("day")]);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>

      {/* <LineChart
        range={{
          start: chartRange[0]?.toMillis(),
          end: chartRange[1]?.toMillis()
        }}
        series={chartSeries}
        timeline={true}
        timeUnit={"day"}
        lineTension={0.2}
      /> */}
    </Box>
  );
};
