import {
  Box,
  Card,
  CardContent,
  Divider,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import COUNTRIES_DATA from "../../../mocks/mocks";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { GeoChart } from "../../../components/Charts/GeoChart";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import CountriesTable from "./CountriesTable";
export const GeoColumn = () => {
  const [content, setContent] = useState("");
  return (
    <Card
      sx={{
        width: 1,
        borderRadius: "8px",
        overflow: "hidden",
      }}
      id="home-row1-column1"
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            xl: "flex-start",
          },
          gap: {
            xs: 2,
            xl: 1,
          },
          pr: "12px",
          flexDirection: {
            xs: "column",
            xl: "row",
          },
          width: "100%",
          alignItems: {
            xs: "center",
            xl: "stretch",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: {
              xs: 1,
              xl: "60%",
            },
          }}
        >
          <Typography
            variant={"h6"}
            sx={{ color: "text.primary", fontWeight: "600", mb: 5 }}
          >
            Energy Price By Country
          </Typography>
          <GeoChart
            setTooltipContent={setContent}
            countriesData={COUNTRIES_DATA}
          />
          <Tooltip id="my-tooltip" content={content} float={true} />
        </Box>
        <Divider orientation={"vertical"} sx={{ height: "auto" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: {
              xs: 1,
              xl: "40%",
            },
            m: "0 auto",
            padding: "0 1rem",
            alignSelf: "flex-start",
          }}
        >
          <CountriesTable countriesData={COUNTRIES_DATA} />
        </Box>
      </CardContent>
    </Card>
  );
};
