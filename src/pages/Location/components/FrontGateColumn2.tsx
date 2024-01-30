import { Box, Card, Typography } from "@mui/material";

import styles from "../location.module.scss";

export const FrontGateColumn2 = () => (
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
      flex: 2,
    }}
    id="home-row3-column2"
  >
    <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
      Event log
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        pr: "12px",

        width: "100%",
        height: "240px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "4px",
          width: "100%",
        }}
      >
        <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
          2023-03-12 13:00
        </Typography>
        <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
          Camera lost power (!)
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "4px",
          width: "100%",
        }}
      >
        <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
          2023-03-12 12:00
        </Typography>
        <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
          Camera lost power (!)
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "4px",
          width: "100%",
        }}
      >
        <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
          2023-03-12 11:00
        </Typography>
        <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
          Camera lost power (!)
        </Typography>
      </Box>
    </Box>
  </Card>
);
