import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ChartOptions } from "chart.js";

import { useClientContext } from "../../../../state/client-context";
import { getState } from "../../../../services/metrics.service";
import { BarChart } from "../../../../components/Charts/BarChart";

const RACK_1_PREFIX = ".01_BESS_1.BMS.RACK1.";
const LABELS_PREFIX = "RACK 1";

const createPaths = (clientPrefix: string, prefix: string) => {
  const paths = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 6; j++) {
      for (let k = 1; k <= 4; k++) {
        paths.push(
          clientPrefix + prefix + "MODULE" + i + ".CELL" + j + "." + k + "_VOLT"
        );
      }
    }
  }
  return paths;
};

const createLabels = (labelPrefix: string) => {
  const paths = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 6; j++) {
      for (let k = 1; k <= 4; k++) {
        paths.push(
          labelPrefix + "|MODULE" + i + "|CELL" + j + "|" + k + "_VOLT"
        );
      }
    }
  }
  return paths;
};

export const Rack1CellVoltageChart = () => {
  // const { prefix: clientPrefix } = useClientContext();
  const clientPrefix = "ALU_FROST";
  const metrics = createPaths(clientPrefix!, RACK_1_PREFIX);

  const { data: response } = useQuery(["rack1"], () => getState(metrics), {
    enabled: !!metrics,
  });

  const chartSeries = [
    {
      label: "Cell voltage",
      data: metrics.map((metric: string) => response?.[metric]?.value || 0),
      backgroundColor: "rgb(70,144,206)",
    },
  ];

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
      x: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "";
          },
        },
      },
    },
  };

  const chartLabels = createLabels(LABELS_PREFIX);

  return (
    <Box
      sx={{
        height: {
          xs: 200,
          sm: 300,
          md: 450,
          lg: 450,
        },
        width: "100%",
      }}
    >
      <Typography variant={"h6"}>RACK 1 CELL VOLTAGE</Typography>
      <BarChart
        options={options}
        series={chartSeries}
        labels={chartLabels}
        dataUnits="kWh"
      />
    </Box>
  );
};
