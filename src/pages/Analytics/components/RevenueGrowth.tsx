import {
  Box,
  Card,
  CardContent,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MOCK_GROWTH } from "../../../mocks/mocks";
import { useAppStore } from "../../../store/appStore";
import { FilledLineChart } from "../../../components/Charts/FilledLineChart";

export const RevenueGrowth = () => {
  const startDate = useAppStore((state) => state.startDate);
  const endDate = useAppStore((state) => state.endDate);

  let filteredSeries = [...MOCK_GROWTH];

  if (startDate && endDate) {
    filteredSeries = MOCK_GROWTH.map((series) => ({
      ...series,
      data: series.data.filter(
        (point) =>
          point.x >= startDate.getTime() && point.x <= endDate.getTime()
      ),
    }));
  }
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.up("md"));
  const lg = useMediaQuery(breakpoints.up("lg"));
  const MRRGrowthDataset = filteredSeries.find(
    (series) => series.label === "MRR Growth"
  )?.data;
  const MRRGrowthDatasetLength = MRRGrowthDataset?.length;
  const MRRGrowthDatasetLastValue =
    MRRGrowthDataset![MRRGrowthDatasetLength! - 1]?.y;
  const AVGMRRDataset = filteredSeries.find(
    (series) => series.label === "AVG, MRR/Customers"
  )?.data;
  const AVGMRRDatasetLength = AVGMRRDataset?.length;
  const AVGMRRDatasetLastValue = AVGMRRDataset![AVGMRRDatasetLength! - 1]?.y;
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",

        borderRadius: "8px",
        p: "12px",
        flex: 1,
      }}
    >
      <CardContent sx={{ padding: 3, position: "relative" }}>
        <Typography
          fontWeight="bold"
          component="span"
          sx={{
            fontSize: {
              xs: "1rem",
              xl: "initial",
            },
          }}
        >
          Account & Monthly Reccuring Revenue Growth
        </Typography>
        <Box
          sx={{
            maxWidth: {
              xs: 1,
              lg: "50%",
            },
            display: "flex",
            flexDirection: {
              xs: "column",
              xl: "row",
            },
            gap: {
              xs: 2,
              xl: 4,
            },
            py: {
              xs: 2,
              xl: 4,
            },
            pl: {
              xs: "initial",
              lg: 0,
            },
            mb: {
              xs: 3,
              lg: "initial",
            },
            position: {
              xs: "initial",
              lg: "absolute",
            },
          }}
        >
          <Box>
            <Typography
              variant={"body2"}
              sx={{
                fontWeight: "400",
                fontSize: {
                  xs: ".8rem",
                  xl: "initial",
                },
              }}
            >
              MRR Growth
            </Typography>
            <Typography
              variant={lg ? "h5" : "h6"}
              sx={{
                py: 0.5,
                fontWeight: "600",
                fontSize: {
                  xs: "1rem",
                  xl: "1.5rem",
                },
              }}
            >
              {MRRGrowthDatasetLastValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: {
                  xs: ".7rem",
                  xl: ".8rem",
                },
                fontWeight: 300,
              }}
            >
              Measure How Fast You're Growing Monthly Recurring Revenue.{" "}
              <Link
                href="#"
                sx={{
                  textDecoration: "none",
                }}
              >
                Learn More
              </Link>
            </Typography>
          </Box>
          <Box>
            <Typography
              variant={"body2"}
              sx={{
                py: 0.5,
                fontWeight: "400",
                fontSize: {
                  xs: ".8rem",
                  xl: "initial",
                },
              }}
            >
              AVG. MRR/Customers
            </Typography>
            <Typography
              variant={lg ? "h5" : "h6"}
              sx={{
                fontWeight: "600",
                fontSize: {
                  xs: "1rem",
                  xl: "1.5rem",
                },
              }}
            >
              {AVGMRRDatasetLastValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: {
                  xs: ".7rem",
                  xl: ".8rem",
                },
                fontWeight: 300,
              }}
            >
              The revenue generated per account on a montly or yearly basis.
              <Link
                href="#"
                sx={{
                  textDecoration: "none",
                }}
              >
                Learn More
              </Link>
            </Typography>
          </Box>
        </Box>
        <FilledLineChart
          series={filteredSeries}
          timeline={true}
          timeUnit={"day"}
          lineTension={0}
          dataUnits="$"
          grid={false}
        />
      </CardContent>
    </Card>
  );
};
