import { Box, Card, Switch, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import code21Logo from "../../assets/images/code21.png";
import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import { TwoColumnsText } from "../../components/TwoColumnsText/TwoColumnsText";
import {
  PS_SYSTEM_CONFIG_LEFT,
  PS_SYSTEM_CONFIG_RIGHT,
} from "../../utils/consts";
import styles from "./Wind.module.scss";
import { ChargingRadarChart } from "./components/ChargingRadarChart/ChargingRadarChart";
import { PowerBarChart } from "./components/PowerBarChart/PowerBarChart";
import { DoughnutSocChart } from "./components/DoughnutSocChart/DoughnutSocChart";
import { DoughnutSohChart } from "./components/DoughnutSohChart/DoughnutSohChart";
import { TabsWithImages } from "./components/Tabs/tabs";
import { PowerLineChart } from "./components/PowerLineChart/PowerLineChart";
import { Rack1CellVoltageChart } from "./components/Rack1CellVoltageChart/Rack1CellVoltageChart";
import { Rack2CellVoltageChart } from "./components/Rack2CellVoltageChart/Rack2CellVoltageChart";

interface WindProps {
  title?: string;
}
export const Wind = ({ title }: WindProps) => {
  const { palette } = useTheme();

  return (
    <div className={styles.sectionsWrapper}>
      <SectionWithTitle title={title || "Wind"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            alignItems: "center",
            gap: "1.2rem",
            mb: {
              xs: "0",
              lg: "0rem",
            },
            flexWrap: {
              xs: "wrap",
              lg: "nowrap",
            },
          }}
        >
          <Card
            className={styles.companyCard}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "12px",
              pr: {
                xs: "0",
                lg: "12px",
              },
              minWidth: {
                xs: "100%",
                lg: "305px",
              },
              borderRadius: "8px",
              overflow: "hidden",
              padding: "0.5rem",
            }}
          >
            <Box
              sx={{
                height: "115px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 1,
              }}
            >
              <img src={code21Logo} alt={"thumb"} className={styles.logo} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "4px",
              }}
            >
              <Typography variant={"body1"}>
                <strong>Code21</strong>
              </Typography>
              <Typography variant={"body2"} sx={{ color: "text.secondary" }}>
                <strong>Code21 Sp. z o.o.</strong>
              </Typography>
              <Typography variant={"body2"} sx={{ color: "text.secondary" }}>
                Sowlany
              </Typography>
              <Typography variant={"body2"} sx={{ color: "text.secondary" }}>
                53.143°E 23.242°N
              </Typography>
            </Box>
          </Card>
          <Card
            sx={{
              flex: 2,
              display: "flex",
              justifyContent: "flex-start",
              gap: "12px",
              pr: "12px",
              minWidth: {
                xs: "unset",
                lg: "580px",
              },
              width: "100%",
              borderRadius: "8px;",
              padding: "0.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: {
                  xs: "wrap",
                  lg: "nowrap",
                },
                justifyContent: "space-between",
                alignItems: "center",
                gap: "4px",
                width: "100%",
                height: {
                  xs: "auto",
                  lg: "115px",
                },
                padding: "1rem",
              }}
            >
              <TwoColumnsText content={PS_SYSTEM_CONFIG_LEFT}></TwoColumnsText>
              <TwoColumnsText content={PS_SYSTEM_CONFIG_RIGHT}></TwoColumnsText>
            </Box>
          </Card>
        </Box>
      </SectionWithTitle>
      <SectionWithTitle title="Doughnut/Power Charts">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "50% 50%",
              xl: "25% 25% 1fr",
            },
            gap: 2,
          }}
        >
          <Box>
            <Card sx={{ p: "1.5rem", height: 1 }}>
              <DoughnutSocChart />
            </Card>
          </Box>
          <Box>
            <Card sx={{ p: "1.5rem", height: 1 }}>
              <DoughnutSohChart />
            </Card>
          </Box>
          <Card
            sx={{
              gridColumn: {
                xs: "inherit",
                md: "span 2",
                xl: "inherit",
              },
            }}
          >
            <PowerBarChart />
          </Card>
        </Box>
      </SectionWithTitle>
      <SectionWithTitle title="ESS Scheduling">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              lg: "50% 50%",
              xl: "37% 1fr",
            },
            gap: 2,
          }}
        >
          <Card sx={{ p: 2 }}>
            <ChargingRadarChart />
          </Card>
          <Card sx={{ p: 2 }} className={styles.planSwitcher}>
            <Typography variant={"h5"} sx={{ marginBottom: 2 }}>
              ESS SCHEDULING
            </Typography>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  p: 1,
                  marginBottom: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF0D",
                }}
              >
                <Typography component={"span"}>Plan {i}</Typography>
                <Switch checked={!!(i % 2)} />
              </Box>
            ))}
          </Card>
        </Box>
      </SectionWithTitle>
      <SectionWithTitle title="Tabs with images">
        <Card sx={{ p: 0 }}>
          <TabsWithImages />
        </Card>
      </SectionWithTitle>
      <SectionWithTitle title="Power Line Charts">
        <Card sx={{ p: 2 }}>
          <PowerLineChart />
        </Card>
      </SectionWithTitle>
      <SectionWithTitle title="Rack cell voltage">
        <Card sx={{ p: 2 }}>
          <Rack1CellVoltageChart />
        </Card>
      </SectionWithTitle>
      <SectionWithTitle title="Rack Cell voltage 2">
        <Card sx={{ p: 2 }}>
          <Rack2CellVoltageChart />
        </Card>
      </SectionWithTitle>
    </div>
  );
};
