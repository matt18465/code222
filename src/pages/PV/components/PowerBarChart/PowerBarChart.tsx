import { ChartOptions } from "chart.js";
import { Box } from "@mui/material";
import { BarChart } from "../../../../components/Charts/BarChart";
import { MOCK_INVERTERS_POWER_BAR } from "../../../../mocks/mocks";

export const PowerBarChart = () => {
  let filteredSeries = MOCK_INVERTERS_POWER_BAR;

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: false,
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
        display: false,
      },
      title: {
        display: true,
        text: "Current power of inverters FP1-FP32",
      },
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
        min: 0,
        max: 250,
        title: {
          display: true,
          text: "Active power [kW]",
        },
      },
      y1: {
        min: 0,
        max: 5.0,
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Daily power yields [MWh]",
        },
        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  let chartLabels = Array.from(Array(32), (_, i) => `FP${i + 1}`);

  return (
    <Box sx={{ p: 2, paddingTop: "2rem", paddingRight: "2rem" }}>
      <BarChart
        labels={chartLabels}
        grouped={true}
        dataUnits={"kWh"}
        series={filteredSeries}
        options={options}
        width={"100%"}
      />
    </Box>
  );
};
