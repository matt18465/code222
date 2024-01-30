import {
  Box,
  Card,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { LineChart } from "../../../../components/Charts/LineChart";
import {
  MOCK_STATION_OVERVIEW_TABLE,
  MOCK_STATION_OVERVIEW_CHART,
  MOCK_STATION_OVERVIEW_CONDITIONS,
} from "../../../../mocks/mocks";
import { useAppStore } from "../../../../store/appStore";
import { useThemeContext } from "../../../../state/theme-context";

type Props = {};

const StationOverview = (props: Props) => {
  const { mode } = useThemeContext();
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.up("md"));
  const xl = useMediaQuery(breakpoints.up("xl"));
  const startDate = useAppStore((state) => state.startDate);
  const endDate = useAppStore((state) => state.endDate);
  let filteredSeries = [...MOCK_STATION_OVERVIEW_CHART[0].avgRadiation];
  if (startDate && endDate) {
    filteredSeries = filteredSeries.map((series) => ({
      ...series,
      data: series.data.filter(
        (point) =>
          point.x >= startDate.getTime() && point.x <= endDate.getTime()
      ),
    }));
  }

  const generateStationsTables = () => {
    const tables = [];
    const station = MOCK_STATION_OVERVIEW_TABLE[0];
    for (const property in station) {
      const { title, color, unit, today, total, current } =
        station[property as keyof typeof station];
      tables.push(
        <Box
          key={property}
          sx={{
            display: "flex",
            height: "auto",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography
            dangerouslySetInnerHTML={{
              __html: title!,
            }}
            sx={{
              color,
              fontWeight: 600,
              flex: 1,
              minWidth: 200,
            }}
          ></Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 2,
              gap: 1,
              flexWrap: {
                xs: "wrap",
                xl: "nowrap",
              },
            }}
          >
            {current && (
              <Box
                sx={{
                  width: 300,
                  bgcolor: mode === "dark" ? "#12121244" : "white",
                  p: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>CURRENT</Typography>{" "}
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      color,
                      fontWeight: 600,
                    }}
                  >
                    {current}
                  </Typography>
                  <Typography
                    sx={{
                      color,
                      fontWeight: 600,
                    }}
                  >
                    {unit}
                  </Typography>
                </Box>
              </Box>
            )}
            {today && (
              <Box
                sx={{
                  width: 300,
                  bgcolor: mode === "dark" ? "#12121244" : "white",
                  p: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>TODAY</Typography>{" "}
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      color,
                      fontWeight: 600,
                    }}
                  >
                    {today}
                  </Typography>
                  <Typography
                    sx={{
                      color,
                      fontWeight: 600,
                    }}
                  >
                    {unit}
                  </Typography>
                </Box>
              </Box>
            )}
            {total && (
              <Box
                sx={{
                  width: 300,
                  bgcolor: mode === "dark" ? "#12121244" : "white",
                  p: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>TOTAL</Typography>{" "}
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      color,
                      fontWeight: 600,
                    }}
                  >
                    {total}
                  </Typography>
                  <Typography
                    sx={{
                      color,
                      fontWeight: 600,
                    }}
                  >
                    {unit}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      );
    }
    return tables;
  };
  return (
    <Card sx={{ width: 1, borderRadius: "8px" }}>
      <Box
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography
          variant={"h6"}
          sx={{
            color: "text.primary",
            fontWeight: "600",
          }}
        >
          Stacja ST_1.1
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={"h6"}
            sx={{
              color: "text.primary",
              fontWeight: "600",

              fontSize: {
                xs: "1rem",
                xl: "initial",
              },
            }}
          >
            {MOCK_STATION_OVERVIEW_CONDITIONS[0].temperature}&#8451;
          </Typography>
          <Divider orientation={"vertical"} />
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <NearMeIcon
              sx={{
                border: `1px solid ${mode === "dark" ? "white" : "black"}`,
                borderRadius: "50%",
              }}
            />
            <Typography
              variant={"h6"}
              sx={{
                color: "text.primary",
                fontWeight: "500",

                fontSize: {
                  xs: "1rem",
                  xl: "initial",
                },
              }}
            >
              {MOCK_STATION_OVERVIEW_CONDITIONS[0].wind}
              <Typography
                component="span"
                sx={{
                  fontSize: {
                    xs: ".8rem",
                    xl: "1",
                  },
                }}
              >
                m/s
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: {
            xs: 220,
            md: 320,
            xl: 220,
          },
          height: {
            xs: 300,
            md: 320,
            xl: 220,
          },
        }}
      >
        <LineChart
          height={xl ? 200 : md ? 320 : 220}
          series={filteredSeries}
          timeline={true}
          timeUnit={"day"}
          lineTension={0.1}
          dataUnits="W/m2"
          disableZoomSlider
        />
      </Box>
      <Box
        sx={{
          bgcolor: mode === "dark" ? "initial" : "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          flexWrap: {
            xs: "wrap",
            lg: "nowrap",
          },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "4px",
          width: "100%",
          height: {
            xs: "auto",
          },
          padding: "1rem",
        }}
      >
        {generateStationsTables()}
      </Box>
    </Card>
  );
};

export default StationOverview;
