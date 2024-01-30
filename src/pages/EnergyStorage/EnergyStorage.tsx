import { Box, Card, Switch, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import code21Logo from "../../assets/images/code21.png";
import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import { TwoColumnsText } from "../../components/TwoColumnsText/TwoColumnsText";
import {
  PS_SYSTEM_CONFIG_LEFT,
  PS_SYSTEM_CONFIG_RIGHT,
} from "../../utils/consts";
import styles from "./EnergyStorage.module.scss";
import { useEnergyStorageStore } from "../../store/energyStorageStore";
import { useDnD } from "../../hooks/useDnd";
import { DragDropContext } from "react-beautiful-dnd";

import { ChargingRadarChart } from "./components/ChargingRadarChart/ChargingRadarChart";
import { PowerBarChart } from "./components/PowerBarChart/PowerBarChart";
import { DoughnutSocChart } from "./components/DoughnutSocChart/DoughnutSocChart";
import { DoughnutSohChart } from "./components/DoughnutSohChart/DoughnutSohChart";
import { TabsWithImages } from "./components/Tabs/tabs";
import { PowerLineChart } from "./components/PowerLineChart/PowerLineChart";
import { Rack1CellVoltageChart } from "./components/Rack1CellVoltageChart/Rack1CellVoltageChart";
import { Rack2CellVoltageChart } from "./components/Rack2CellVoltageChart/Rack2CellVoltageChart";

const CARD_WIDTHS = {
  "EnergyStorage-row1-column1": {
    xs: "100%",
    xl: "25%",
  },
  "EnergyStorage-row1-column2": {
    xs: "100%",
    xl: "75%",
  },
  "EnergyStorage-row2-column1": {
    xs: "100%",
    lg: "49%",
    xl: "25%",
  },
  "EnergyStorage-row2-column2": {
    xs: "100%",
    lg: "49%",
    xl: "25%",
  },
  "EnergyStorage-row2-column3": {
    xs: "100%",
    xl: "50%",
  },
  "EnergyStorage-row3-column1": {
    xs: "100%",
    xl: "40%",
  },
  "EnergyStorage-row3-column2": {
    xs: "100%",
    xl: "60%",
  },
};
interface EnergyStorageProps {
  title?: string;
}
type CardID = keyof typeof CARD_WIDTHS;

export const EnergyStorage = ({ title }: EnergyStorageProps) => {
  const { palette } = useTheme();
  const {
    row1Order,
    setRow1Order,
    row2Order,
    setRow2Order,
    row3Order,
    setRow3Order,
  } = useEnergyStorageStore();
  const setRowOrders = {
    "EnergyStorage-row-1": setRow1Order,
    "EnergyStorage-row-2": setRow2Order,
    "EnergyStorage-row-3": setRow3Order,
  };

  const rowOrders = {
    "EnergyStorage-row-1": row1Order,
    "EnergyStorage-row-2": row2Order,
    "EnergyStorage-row-3": row3Order,
  };

  const getCardById = (cardId: CardID) => {
    switch (cardId) {
      case "EnergyStorage-row1-column1":
        return (
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
              width: 1,
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
        );
      case "EnergyStorage-row1-column2":
        return (
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
                padding: 2,
              }}
            >
              <TwoColumnsText content={PS_SYSTEM_CONFIG_LEFT}></TwoColumnsText>
              <TwoColumnsText content={PS_SYSTEM_CONFIG_RIGHT}></TwoColumnsText>
            </Box>
          </Card>
        );
      case "EnergyStorage-row2-column1":
        return (
          <Card sx={{ p: 2, height: 1, width: 1 }}>
            <DoughnutSocChart />
          </Card>
        );
      case "EnergyStorage-row2-column2":
        return (
          <Card sx={{ p: 2, height: 1, width: 1 }}>
            <DoughnutSohChart />
          </Card>
        );
      case "EnergyStorage-row2-column3":
        return (
          <Card sx={{ width: 1 }}>
            <PowerBarChart />
          </Card>
        );
      case "EnergyStorage-row3-column1":
        return (
          <Card sx={{ p: 2, height: 1, width: 1 }}>
            <ChargingRadarChart />
          </Card>
        );
      case "EnergyStorage-row3-column2":
        return (
          <Card
            sx={{ p: 2, height: 1, width: 1 }}
            className={styles.planSwitcher}
          >
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
                  backgroundColor:
                    i % 2
                      ? palette.background.paper
                      : palette.background.default,
                }}
              >
                <Typography component={"span"}>Plan {i}</Typography>
                <Switch checked={!!(i % 2)} />
              </Box>
            ))}
          </Card>
        );
      default:
        return null;
    }
  };
  const { onDragEnd, renderDroppableRow } = useDnD(
    getCardById,
    CARD_WIDTHS,
    setRowOrders,
    rowOrders
  );
  return (
    <div className={styles.sectionsWrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <SectionWithTitle title={title || "Energy Storage"}>
          {renderDroppableRow("EnergyStorage-row-1", row1Order, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          })}
        </SectionWithTitle>
      </DragDropContext>
      <DragDropContext onDragEnd={onDragEnd}>
        <SectionWithTitle title="Doughnut/Power Charts">
          <Box>
            {renderDroppableRow("EnergyStorage-row-2", row2Order, {
              gap: 2,
              width: "100%",
              display: "flex",
              flexDirection: {
                xs: "row",
              },
              justifyContent: "center",
              flexWrap: {
                xs: "wrap",
                xl: "nowrap",
              },
            })}
          </Box>
        </SectionWithTitle>
      </DragDropContext>
      <DragDropContext onDragEnd={onDragEnd}>
        <SectionWithTitle title="ESS Scheduling">
          <Box>
            {renderDroppableRow("EnergyStorage-row-3", row3Order, {
              display: {
                xs: "grid",
                xl: "flex",
              },
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                lg: "50% 50%",
                xl: "40% 1fr",
              },
              gap: 2,
              width: "100%",
            })}
          </Box>
        </SectionWithTitle>
      </DragDropContext>
      <SectionWithTitle title="Tabs with images">
        <Card sx={{ p: 2 }}>
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
