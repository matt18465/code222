import { Box, Card, CardContent, Divider, Link } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TwoColumnsText } from "../../../components/TwoColumnsText/TwoColumnsText";
import {
  ENERGY_STORAGE_SYSTEM_LEFT,
  ENERGY_STORAGE_SYSTEM_RIGHT,
} from "../../../utils/consts";
import { MOCK_CHART_WIDGETS } from "../../../mocks/mocks";
import { ChartWidget } from "../../../components/ChartWidget/ChartWidget";
const widgetData = MOCK_CHART_WIDGETS[3];

export const VisitorsColumn = () => (
  <Card
    sx={{
      flex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      gap: "12px",
      pr: "12px",
      borderRadius: "8px",
      backgroundColor: "lightBg",
      width: 1,
    }}
    id="home-row1-column2"
  >
    <CardContent>
      <ChartWidget {...widgetData} timeline={true} vertical={true} />
      <Divider sx={{ mb: 3 }} />
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
