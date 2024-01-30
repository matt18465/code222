import { Box, Card } from "@mui/material";

import { TwoColumnsText } from "../../../components/TwoColumnsText/TwoColumnsText";
import {
  ENERGY_STORAGE_SYSTEM_LEFT,
  ENERGY_STORAGE_SYSTEM_RIGHT,
} from "../../../utils/consts";

export const OverviewColumn2 = () => (
  <Card
    sx={{
      flex: 2,
      display: "flex",
      justifyContent: "flex-start",
      gap: "12px",
      pr: "12px",
      width: "100%",
      borderRadius: "8px;",
    }}
    id="home-row1-column2"
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "4px",
        width: "100%",
        minHeight: "115px",
        padding: "10px",
      }}
    >
      <TwoColumnsText content={ENERGY_STORAGE_SYSTEM_LEFT}></TwoColumnsText>
      <TwoColumnsText content={ENERGY_STORAGE_SYSTEM_RIGHT}></TwoColumnsText>
    </Box>
  </Card>
);
