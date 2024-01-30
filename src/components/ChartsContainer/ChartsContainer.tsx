import { Box, Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "../Charts/LineChart";
import { ChartWidget } from "../ChartWidget/ChartWidget";
import { MOCK_CHART_WIDGETS, MOCK_YIELD_FORECAST } from "../../mocks/mocks";
export const ChartsContainer = () => {
  return (
    <Box sx={{ flex: 1, display: "flex", gap: 2, flexDirection: "column" }}>
      <Box
        sx={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: {
            xs: "1fr",
            xl: "repeat(2, 1fr)",
            xxl: "repeat(4, 1fr)",
          },
          gridTemplateRows: "1fr",
        }}
      >
        {MOCK_CHART_WIDGETS.map((el, i) => (
          <Card
            key={i}
            sx={{
              backgroundColor: "lightBg",
              width: 1,
            }}
          >
            <CardContent
              sx={{
                paddingTop: 1,
                paddingBottom: {
                  xs: "initial",
                  xl: ".2rem!important",
                },
              }}
            >
              <ChartWidget {...el} timeline={true} />
            </CardContent>
          </Card>
        ))}
      </Box>
      <Card
        sx={{
          display: "none",
          boxShadow: "0px 1px 4px #15223214 !important;",
        }}
      >
        <CardContent sx={{ padding: 3 }}>
          <Typography fontWeight="bold" component="span">
            Yield Forecast
          </Typography>{" "}
          [MWh]
          <Box sx={{ height: 450 }}>
            <LineChart
              series={MOCK_YIELD_FORECAST}
              timeline={true}
              timeUnit={"month"}
              lineTension={0.2}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
