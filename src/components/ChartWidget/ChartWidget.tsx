import {
  Box,
  Card,
  CardContent,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

import { SimpleLineChart } from "../Charts/SimpleLineChart";
import styles from "./ChartWidget.module.scss";
import { useThemeContext } from "../../state/theme-context";

interface ChartWidgetProps {
  title: string;
  value: string;
  valueUnit?: string;
  change: string;
  changeNegative?: boolean;
  series: {
    data: { x: number; y: number }[];
    color: string;
    bgColor?: string;
    label?: string;
  };
  timeline?: boolean;
  vertical?: boolean;
}

export const ChartWidget = ({
  title,
  value,
  valueUnit,
  change,
  changeNegative,
  series,
  timeline,
  vertical,
}: ChartWidgetProps) => {
  const { mode } = useThemeContext();

  return (
    <Box className={`${styles.root} ${mode === "dark" ? styles.dark : ""}`}>
      <Typography
        variant={"h6"}
        sx={{
          fontSize: vertical
            ? {
                xs: "1.2rem",
                xl: "1rem",
                xxl: "1.2rem",
              }
            : {},
          fontWeight: vertical ? "600" : "initial",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          mt: 3,
          gap: vertical ? 4 : 1,
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            variant="caption"
            sx={{
              fontSize: {
                xs: "1.2rem",
                xl: "1rem",
                xxl: "1.7rem",
              },
              lineHeight: "35px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {value}{" "}
            <Typography
              variant="caption"
              sx={{
                fontSize: {
                  xs: "1rem",
                  xl: ".8rem",
                  xxl: "1.3rem",
                },
                lineHeight: "35px",

                marginBottom: "5px",
              }}
            >
              {valueUnit}
            </Typography>
          </Typography>
          {change && (
            <Box sx={{ display: "flex" }}>
              <span
                className={`${styles.change} ${
                  changeNegative ? styles.changeNegative : styles.changePositive
                }`}
              >
                {change}
                {changeNegative ? (
                  <SouthIcon className={styles.icon} />
                ) : (
                  <NorthIcon className={styles.icon} />
                )}
              </span>
              <Typography
                component="span"
                fontSize={12}
                color="text.secondary"
                className={styles.changeLabel}
              >
                than last year
              </Typography>
            </Box>
          )}
        </div>
        <Box
          sx={{
            height: vertical ? 90 : 45,
            maxHeight: vertical ? 90 : 45,
            flex: 1,
            maxWidth: vertical
              ? { xs: 80, sm: 1 }
              : {
                  xs: 80,
                  sm: 120,
                  md: 160,
                  xl: 180,
                },
          }}
        >
          <SimpleLineChart series={series} timeline={timeline} />
        </Box>
      </Box>
    </Box>
  );
};
