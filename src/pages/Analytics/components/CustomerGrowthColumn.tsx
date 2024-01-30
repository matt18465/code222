import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { BarChart } from "../../../components/Charts/BarChart";
import { MOCK_CUSTOMERS_GROWTH, MOCK_SALES_REPORT } from "../../../mocks/mocks";
export const CustomerGrowthColumn = () => {
  const { palette } = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        pr: "12px",
        width: {
          xs: 1,
          xl: "77%",
        },
        borderRadius: "8px",
        p: "12px",
        flex: 1,
        minHeight: {
          xs: 300,
        },
      }}
    >
      <CardContent>
        <Typography
          variant={"h6"}
          sx={{
            color: "text.primary",
            fontWeight: "600",
            mb: 3,
            fontSize: {
              xs: "1rem",
              xl: "initial",
            },
          }}
        >
          Customer Growth
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            stacked
            grid={{
              x: false,
            }}
            stepSize={200}
            grouped={true}
            timeUnit={"month"}
            timeline={true}
            dataUnits={"$"}
            series={MOCK_CUSTOMERS_GROWTH}
            options={{
              interaction: {
                mode: "index" as const,
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
                  align: "start",
                  labels: {
                    usePointStyle: true,
                    boxHeight: 7,
                    boxWidth: 300,
                  },
                },
                tooltip: {
                  backgroundColor: palette.background.paper,
                  titleColor: palette.text.primary,
                  bodyColor: palette.text.primary,
                  borderWidth: 1,
                  borderColor: palette.divider,
                  usePointStyle: true,
                  itemSort: (a, b, data) => {
                    return b.datasetIndex - a.datasetIndex;
                  },
                  boxHeight: 7,
                  padding: 10,
                  xAlign: "center",
                  bodyFont: {
                    weight: "600",
                  },

                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.formattedValue} ${tooltipItem.dataset.label}`;
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
