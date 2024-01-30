import { useQuery } from "@tanstack/react-query";
import { orange } from "@mui/material/colors";

import { DoughnutChart } from "../../../../components/Charts/DoughnutChart";
import { useClientContext } from "../../../../state/client-context";
import { getState } from "../../../../services/metrics.service";
import { Box } from "@mui/material";

export const DoughnutSocChart = () => {
  const { prefix: clientPrefix } = useClientContext();

  const DNT_CHART_METRICS = {
    data1: clientPrefix + ".01_BESS_1.BMS.MASTER.MEASUREMENTS.SystemSoc",
    data2: clientPrefix + ".01_BESS_1.BMS.MASTER.MEASUREMENTS.SystemSoc100",
  };

  const { data: response } = useQuery(["dntData1"], () =>
    getState(Object.values(DNT_CHART_METRICS))
  );

  const value1 = response?.[DNT_CHART_METRICS.data1]?.value || 0;
  const value2 = response?.[DNT_CHART_METRICS.data2]?.value || 0;

  const dntSettings = {
    labels: ["SOC " + value1 + "%", "SOC " + value2 + "%"],
    series: [
      {
        label: "SOC",
        data: [value1, value2],
        bgColors: [orange[500], "rgba(0, 0, 0, 0.1)"],
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
