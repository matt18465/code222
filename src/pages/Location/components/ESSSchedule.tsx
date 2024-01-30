import { Card, CardContent, Typography } from "@mui/material";

import styles from "../location.module.scss";
import { LineChart } from "../../../components/Charts/LineChart";
import { MOCK_YIELD_FORECAST } from "../../../mocks/mocks";
import { useAppStore } from "../../../store/appStore";

export const ESSSchedule = () => {
  const startDate = useAppStore((state) => state.startDate);
  const endDate = useAppStore((state) => state.endDate);

  let filteredSeries = [...MOCK_YIELD_FORECAST];

  if (startDate && endDate) {
    filteredSeries = MOCK_YIELD_FORECAST.map((series) => ({
      ...series,
      data: series.data.filter(
        (point) =>
          point.x >= startDate.getTime() && point.x <= endDate.getTime()
      ),
    }));
  }

  return (
    <Card className={styles.chartCard}>
      <CardContent sx={{ padding: 3 }}>
        <Typography fontWeight="bold" component="span">
          Yield Forecast
        </Typography>
        [MWh]
        <LineChart
          series={filteredSeries}
          timeline={true}
          timeUnit={"day"}
          lineTension={0.2}
          dataUnits="MWh"
        />
      </CardContent>
    </Card>
  );
};
