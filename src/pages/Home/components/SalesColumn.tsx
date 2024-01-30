import { Box, Card, Typography, useTheme } from "@mui/material";
import styles from "../home.module.scss";
import { BarChart } from "../../../components/Charts/BarChart";
import { MOCK_SALES_REPORT } from "../../../mocks/mocks";
import { useAppStore } from "../../../store/appStore";
export const SalesColumn = () => {
  const { palette } = useTheme();
  const startDate = useAppStore((state) => state.startDate);
  const endDate = useAppStore((state) => state.endDate);
  let filteredSeries = MOCK_SALES_REPORT;
  if (startDate && endDate) {
    filteredSeries = filteredSeries.map((series) => ({
      ...series,
      data: series.data.filter(
        (point) =>
          point.x >= startDate.getTime() && point.x <= endDate.getTime()
      ),
    }));
  }
  return (
    <Card
      className={styles.chartCard}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        pr: "12px",
        width: "100%",
        borderRadius: "8px",
        p: "12px",
        flex: 1,
      }}
      id="home-row3-column1"
    >
      <Typography
        variant={"h6"}
        sx={{ color: "text.primary", fontWeight: "600", mb: 3 }}
      >
        Sales Report
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
          grouped={true}
          timeUnit={"month"}
          timeline={true}
          dataUnits={"$"}
          series={filteredSeries}
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
                  padding: 10,
                  boxWidth: 200,
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
                bodyFont: {
                  weight: "600",
                },

                callbacks: {
                  label: (tooltipItem) => {
                    return `$${tooltipItem.formattedValue}k ${tooltipItem.dataset.label}`;
                  },
                },
              },
            },
          }}
        />
      </Box>
    </Card>
  );
};
