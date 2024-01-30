import { Box, useTheme } from "@mui/material";
import { DoughnutChart } from "../../../../components/Charts/DoughnutChart";
import { orange } from "@mui/material/colors";
import { htmlLegendPlugin } from "../../../../components/Charts/chartPlugins";

const DoughnutSourceChart = () => {
  const { palette } = useTheme();

  const dntSettings = {
    labels: ["Wind", "Hydro", "PV", "ESS"],
    series: [
      {
        borderWidth: 1,

        data: [50, 25, 15, 10],
        bgColors: ["#0062ff", "#29cb97", "rgb(255, 205, 86)", orange[500]],
        hoverOffset: 4,
        label: "",
      },
    ],
    dataUnits: "%",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxHeight: 170,
        }}
      >
        <DoughnutChart
          {...dntSettings}
          plugins={[htmlLegendPlugin]}
          options={{
            cutout: "88%",
            plugins: {
              htmlLegend: {
                containerID: "legend-container",
              },
              legend: {
                labels: {},
                display: false,
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
                  label: function (context) {
                    let label = context.label;
                    let value = context.formattedValue;

                    if (!label) label = "Unknown";

                    let sum = 0;
                    let dataArr = context.chart.data.datasets[0].data;
                    dataArr.map((data) => {
                      sum += Number(data);
                    });

                    let percentage = value + "%";
                    return label + ": " + percentage;
                  },
                },
              },
            },
          }}
        />
      </Box>
      <div id="legend-container"></div>
    </Box>
  );
};

export default DoughnutSourceChart;
