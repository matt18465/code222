import { Box, Card, Typography } from "@mui/material";

import styles from "../location.module.scss";

export const FrontGateColumn1 = () => (
  <Card
    className={styles.chartCard}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      pr: "12px",
      width: "100%",
      borderRadius: "8px",
      p: "12px",
      flex: 1,
    }}
    id="home-row3-column1"
  >
    <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
      CAM 01 - FrontGate
    </Typography>
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#000000",
        color: "#ffffff",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
        height: "240px",
      }}
    >
      <p>Camera lost power (!)</p>
    </Box>
  </Card>
);
