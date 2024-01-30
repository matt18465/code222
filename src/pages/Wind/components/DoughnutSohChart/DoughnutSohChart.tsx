import { useQuery } from "@tanstack/react-query";
import { green, orange } from "@mui/material/colors";

import { DoughnutChart } from "../../../../components/Charts/DoughnutChart";
import { useClientContext } from "../../../../state/client-context";
import { getState } from "../../../../services/metrics.service";
import { Box } from "@mui/material";

export const DoughnutSohChart = () => {
  const { prefix: clientPrefix } = useClientContext();

  const DNT_CHART_METRICS = {
    data1: clientPrefix + ".01_BESS_1.BMS.MASTER.MEASUREMENTS.SystemSoh",
    data2: clientPrefix + ".01_BESS_1.BMS.MASTER.MEASUREMENTS.SystemSoh100",
  };

  const { data: response } = useQuery(["dntData2"], () =>
    getState(Object.values(DNT_CHART_METRICS))
  );

  const value1 = response?.[DNT_CHART_METRICS.data1]?.value || 0;
  const value2 = response?.[DNT_CHART_METRICS.data2]?.value || 0;

  const dntSettings = {
    labels: ["SOH " + value1 + "%", "SOH " + value2 + "%"],
    series: [
      {
        label: "SOH",
        data: [value1, value2],
        bgColors: [green[500], "rgba(0, 0, 0, 0.1)"],
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
        height: 1,
      }}
    >
      <DoughnutChart {...dntSettings} />
    </Box>
  );
};
