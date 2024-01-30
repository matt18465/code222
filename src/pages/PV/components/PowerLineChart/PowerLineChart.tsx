import { Box } from "@mui/material";
import { LineChart } from "../../../../components/Charts/LineChart";
import { MOCK_INVERTERS_POWER_LINE } from "../../../../mocks/mocks";
import { useAppStore } from "../../../../store/appStore";
import { ChartOptions } from "chart.js";

export const PowerLineChart = () => {
  const startDate = useAppStore((state) => state.startDate);
  const endDate = useAppStore((state) => state.endDate);

  let filteredSeries = [...MOCK_INVERTERS_POWER_LINE];

  if (startDate && endDate) {
    filteredSeries = MOCK_INVERTERS_POWER_LINE.map((series) => ({
      ...series,
      data: series.data.filter(
        (point) =>
          point.x >= startDate.getTime() && point.x <= endDate.getTime()
      ),
    }));
  }
  const options: ChartOptions<"line"> = {
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
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        min: 0,
        max: 60,
        title: {
          display: true,
          text: "[MWh]",
        },
      },
      y1: {
        min: 0,
        max: 7,
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "[MW]",
        },

        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  return (
    <Box
      sx={{
        height: {
          xs: "auto",
          xl: 450,
        },
        width: "100%",
        paddingTop: "1rem",
      }}
    >
      <LineChart
        options={options}
        series={filteredSeries}
        timeline={true}
        timeUnit={"day"}
        lineTension={0.2}
        dataUnits="MWh"
      />
    </Box>
  );
};
