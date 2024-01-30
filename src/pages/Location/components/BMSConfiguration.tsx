import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import { TwoColumnsText } from "../../../components/TwoColumnsText/TwoColumnsText";
import {
  BMS_CONFIGURATION_BOX_1,
  BMS_CONFIGURATION_BOX_2,
  BMS_CONFIGURATION_BOX_3,
  BMS_CONFIGURATION_BOX_4,
} from "../../../utils/consts";

export const BMSConfiguration = () => {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.up("md"));
  return (
    <Paper
      variant={"outlined"}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        },
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
          Power Cell Specification
        </Typography>
        <TwoColumnsText
          content={BMS_CONFIGURATION_BOX_1}
          widthColRight={md ? "200px" : "50%"}
        ></TwoColumnsText>
      </Box>
      <Box>
        <Typography
          variant={"h6"}
          sx={{
            color: "rgb(126, 132, 163)",
            paddingBottom: ".5rem",
          }}
        >
          Battery Pack Specification
        </Typography>
        <TwoColumnsText
          content={BMS_CONFIGURATION_BOX_4}
          widthColRight={md ? "200px" : "50%"}
        ></TwoColumnsText>
      </Box>
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
          widthColRight={md ? "200px" : "50%"}
        ></TwoColumnsText>
      </Box>
      <Box>
        <Typography
          variant={"h6"}
          sx={{
            color: "rgb(126, 132, 163)",
            paddingBottom: ".5rem",
          }}
        >
          Battery Module Specification
        </Typography>
        <TwoColumnsText
          content={BMS_CONFIGURATION_BOX_3}
          widthColRight={md ? "200px" : "50%"}
        ></TwoColumnsText>
      </Box>
    </Paper>
  );
};
