import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "../home.module.scss";
import DoughnutSourceChart from "./DoughnutSourceChart/DoughnutSourceChart";

export const GenerationColumn = () => (
  <Card
    className={styles.chartCard}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      pr: "12px",
      width: "100%",
      borderRadius: "8px",
      flex: 2,
      height: 1,
    }}
    id="home-row3-column2"
  >
    <CardContent
      sx={{
        position: "relative",
        "& .download-btn": {
          position: "absolute",
          bottom: "1.2rem",
          right: "1.2rem",
        },
      }}
    >
      <Typography
        variant={"h6"}
        sx={{ color: "text.primary", fontWeight: "600", mb: 6 }}
      >
        Generation Breakdown by Source
      </Typography>
      <DoughnutSourceChart />
      <Divider sx={{ mt: 4, mb: 3 }} />
      <Link
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.8,
          textDecoration: "none",
          fontWeight: 500,
          transition: ".3s all",
          "&:hover": {
            opacity: 0.8,
            gap: 1,
          },
        }}
      >
        More insights <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />{" "}
      </Link>
    </CardContent>
  </Card>
);
