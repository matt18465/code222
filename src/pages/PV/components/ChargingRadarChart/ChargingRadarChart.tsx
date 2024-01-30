import { useEffect, useState } from "react";
import { DateTime, Interval } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { blue, green, pink, yellow } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, MenuItem, Select, TextField, useTheme } from "@mui/material";

import {
  getAgrVariableData,
  getDescriptorsMap,
} from "../../../../services/metrics.service";
import { RadarChart } from "../../../../components/Charts/RadarChart";
import { useClientContext } from "../../../../state/client-context";
import { FullscreenView } from "../../../../components/FullscreenView/FullscreenView";
import { useAppStore } from "../../../../store/appStore";

export const ChargingRadarChart = () => {
  const { palette } = useTheme();

  const { startDate, endDate } = useAppStore((state) => ({
    startDate: state.startDate,
    endDate: state.endDate,
  }));
  const [offset, setOffset] = useState<number>(3600);
  const [interval, setInterval] = useState<number>(512);
  const { prefix: clientPrefix } = useClientContext();

  const CHART_METRICS = {
    radar1s1: clientPrefix + ".Storage.Schedule.operation_plan_storage_power",
    radar1s2: clientPrefix + ".01_BESS_1.INV1.MEASUREMENTS.P",
    radar1s3: clientPrefix + ".00_RSN.BAY5.P",
  };

  const METRIC_ALIASES = Object.values(CHART_METRICS);

  const startDateTime = DateTime.fromJSDate(startDate!);
  const endDateTime = DateTime.fromJSDate(endDate!);
  const { data: descriptorsMap, error } = useQuery(
    ["descriptors"],
    () => getDescriptorsMap(METRIC_ALIASES),
    { enabled: clientPrefix === "ALU_FROST" }
  );

  useEffect(() => {
    if (error) console.error("Error in descriptorsMap query", error);
  }, [error]);

  useEffect(() => {
    startDate?.setHours(startDate.getHours() - 1);
  }, [startDate]);
  let { data: radar1s1 } =
    useQuery(
      ["radar1s1", [startDateTime, endDateTime], offset],
      () =>
        getAgrVariableData(
          descriptorsMap![CHART_METRICS.radar1s1].id,
          startDateTime.toMillis(),
          endDateTime.toMillis(),
          undefined,
          offset
        ),
      { enabled: !!descriptorsMap?.[CHART_METRICS.radar1s1] }
    ) || [];

  const { data: radar1s2 } = useQuery(
    ["radar1s2", [startDateTime, endDateTime], offset],
    () =>
      getAgrVariableData(
        descriptorsMap![CHART_METRICS.radar1s2].id,
        startDateTime.toMillis(),
        endDateTime.toMillis(),
        undefined,
        offset
      ),
    { enabled: !!descriptorsMap?.[CHART_METRICS.radar1s2] }
  );

  const { data: radar1s3 } = useQuery(
    ["radar1s3", [startDateTime, endDateTime], offset],
    () =>
      getAgrVariableData(
        descriptorsMap![CHART_METRICS.radar1s3].id,
        startDateTime.toMillis(),
        endDateTime.toMillis(),
        undefined,
        offset
      ),
    { enabled: !!descriptorsMap?.[CHART_METRICS.radar1s3] }
  );
  const splitDateIntoEqualIntervals = (
    startDate: Date,
    endDate: Date,
    numberOfIntervals: number
  ): { start: Date; end: Date; avg: Date }[] => {
    const intervalLength =
      (endDate.getTime() - startDate.getTime()) / numberOfIntervals;
    return [...new Array(numberOfIntervals)].map((e, i) => {
      return {
        start: new Date(startDate.getTime() + i * intervalLength),
        avg: new Date(startDate.getTime() + (i + 0.5) * intervalLength),
        end: new Date(startDate.getTime() + (i + 1) * intervalLength),
      };
    });
  };
  const intervals = splitDateIntoEqualIntervals(startDate!, endDate!, 24);

  const sliceChartData = (chartData: { x: number; y: number }[]) => {
    return intervals.reduce(
      (acc: { x: DateTime | number; y: number }[], curr) => {
        const intervalStart = DateTime.fromJSDate(curr.start!);
        const intervalAvg = DateTime.fromJSDate(curr.avg!);
        const intervalEnd = DateTime.fromJSDate(curr.end!);
        const interval = Interval.fromDateTimes(intervalStart, intervalEnd);
        const foundTimestamp = chartData?.find((r) => {
          const dateTimeToCheck = DateTime.fromMillis(r?.x);
          const foundRecord = interval.contains(dateTimeToCheck);
          return foundRecord;
        });
        return [...acc, foundTimestamp ?? { x: intervalAvg?.toMillis(), y: 0 }];
      },
      []
    );
  };
  const transformData = (val: number | string): number => {
    if (typeof val === "number" && !isNaN(val) && Math.abs(val) < 100) {
      // For normal numbers within the range
      return parseFloat(val.toFixed(1));
    }

    if (typeof val === "string") {
      // Convert scientific notation string to a number
      val = Number(val);
    }

    if (Math.abs(val) >= 100 || isNaN(val)) {
      return parseFloat((Number(val.toString().slice(0, 2)) / 10).toFixed(1));
    }

    return val;
  };

  // Calculate the number of days between startDate and endDate
  const totalDays = endDateTime.diff(startDateTime, "days").days;
  let labels = [];
  labels = Array.from({ length: 24 }, (_, i) => i + 1);

  if (totalDays <= 1) {
    const secondsOffset = endDateTime.diff(startDateTime, "seconds").seconds;
    if (offset != secondsOffset / 24) {
      setOffset(secondsOffset / 24);
    }
  } else if (offset !== 3600) {
    setOffset(3600); // restore
  }

  const chartContent = (
    <Box
      sx={{
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxHeight: {
            xs: "400px",
            xl: "100%",
          },
          display: "flex",
          flexDirection: "column",
          height: 1,
        }}
      >
        <RadarChart
          timestamps={intervals}
          labels={labels}
          series={[
            {
              label: "Charging schedule",
              data:
                sliceChartData(radar1s1!)?.map((el) => transformData(el.y)) ||
                [], // Apply transformation here.
              color: yellow[700],
            },
            {
              label: "Charging",
              data: sliceChartData(radar1s2!)?.map((el) => el.y) || [],
              color: green[500],
            },
            {
              label: "Discharging",
              data: sliceChartData(radar1s3!)?.map((el) => el.y) || [],
              color: pink[500],
            },
            {
              label: "Standby",
              data: sliceChartData(radar1s1!)?.map((el) => 0) || [],
              color: blue[500],
            },
          ]}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Box
        sx={{
          position: "relative",
          height: {
            xs: "500px",
            sm: "550px",
            xl: "270px",
          },
          maxHeight: {
            xs: "500px",
            sm: "550px",
            xl: "270px",
          },
          marginTop: "-0.5rem",
        }}
      >
        {chartContent}
      </Box>
      <FullscreenView
        title={"ESS Scheduler Chart"}
        btnProps={{ sx: { position: "absolute", top: 7, right: 0 } }}
      >
        <Box
          sx={{
            height: {
              xs: "50vh",
              md: "70vh",
              xl: "75vh",
            },
            maxHeight: {
              xs: "50vh",
              md: "70vh",
              xl: "75vh",
            },
          }}
        >
          {chartContent}
        </Box>
      </FullscreenView>
    </Box>
  );
};
