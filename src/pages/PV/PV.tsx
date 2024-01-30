import { Box, Card } from "@mui/material";
import { useTheme } from "@mui/system";
import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import styles from "./PV.module.scss";
import { PowerBarChart } from "./components/PowerBarChart/PowerBarChart";

import { PowerLineChart } from "./components/PowerLineChart/PowerLineChart";

import PlantOverviewTable from "./components/PlantOverviewTable/PlantOverviewTable";
import StationOverview from "./components/StationOverview/StationOverview";

interface PVProps {
  title?: string;
}
export const PV = ({ title }: PVProps) => {
  return (
    <div className={styles.sectionsWrapper}>
      <SectionWithTitle id={title || "PV"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            alignItems: "stretch",
            gap: "1.2rem",
            mb: {
              xs: "0",
              lg: "0rem",
            },
            flexWrap: {
              xs: "wrap",
              xl: "nowrap",
            },
          }}
        >
          <PlantOverviewTable />
          <StationOverview />
        </Box>
      </SectionWithTitle>
      <SectionWithTitle id="Power Bar Chart">
        <Box
          sx={{
            display: "flex",
            width: 1,
            gap: 2,
          }}
        >
          <Card sx={{ width: 1 }}>
            <PowerBarChart />
          </Card>
        </Box>
      </SectionWithTitle>

      <SectionWithTitle id="Power Line Chart">
        <Card sx={{ p: 2 }}>
          <PowerLineChart />
        </Card>
      </SectionWithTitle>
    </div>
  );
};
