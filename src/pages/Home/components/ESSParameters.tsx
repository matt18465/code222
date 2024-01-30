import { Box, Paper, Typography } from "@mui/material";

import { TwoColumnsText } from "../../../components/TwoColumnsText/TwoColumnsText";
import { BMS_CONFIGURATION_BOX_2 } from "../../../utils/consts";

export const ESSParameters = () => (
  <Paper
    variant={"outlined"}
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "24px",
      width: "100%",
      borderRadius: "8px",
      p: "18px",
      backgroundColor: "lightBg",
    }}
  >
    <Box>
      <Typography
        variant={"h6"}
        sx={{
          color: "rgb(126, 132, 163)",
          paddingBottom: ".5rem",
        }}
      >
        Operating Parameters
      </Typography>
      <TwoColumnsText
        content={BMS_CONFIGURATION_BOX_2}
        widthColRight="200px"
      ></TwoColumnsText>
    </Box>
  </Paper>
);
