import { Box, Paper, Typography } from "@mui/material";
import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import styles from "./Analytics.module.scss";
import { ChartsContainer } from "../../components/ChartsContainer/ChartsContainer";
import CircleItem from "./components/CircleItem";
import { RoutePathname } from "../../utils/routing";
import { RevenueGrowth } from "./components/RevenueGrowth";
import { CustomerGrowthColumn } from "./components/CustomerGrowthColumn";
import NewCustomersColumn from "./components/NewCustomersColumn";
import AnalyticsTraffic from "./components/AnalyticsTraffic";

const circleItems = [
  {
    title: "ESS Scheduler",
    link: `${RoutePathname.Locations}/location1`,
    disabled: false,
  },
  { title: "ESS Estimator", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
  { title: "", link: "", disabled: true },
];

export const Analytics = () => {
  return (
    <div className={styles.sectionsWrapper}>
      <SectionWithTitle title={"Analytics"}>
        <ChartsContainer />
      </SectionWithTitle>

      <SectionWithTitle title="Tools">
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            width: "100%",
            borderRadius: "8px",
            p: "18px",
          }}
        >
          <Box width={1}>
            <Box
              sx={{
                width: 1,
                display: "grid",
                gridTemplateColumns: {
                  xl: "repeat(6, 1fr)",
                },
                "@media (max-width: 1536px)": {
                  gridTemplateColumns: "repeat(4, 1fr)",
                },
                "@media (max-width: 1150px)": {
                  gridTemplateColumns: "repeat(3, 1fr)",
                },
                "@media (max-width: 950px)": {
                  gridTemplateColumns: "repeat(2, 1fr)",
                },

                gap: 3,
              }}
            >
              {circleItems.map((item, i) => (
                <CircleItem
                  key={i}
                  disabled={item.disabled}
                  title={item.title}
                  link={item.link}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </SectionWithTitle>
      <SectionWithTitle>
        <RevenueGrowth />
      </SectionWithTitle>
      <SectionWithTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              xl: "row",
            },
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: {
              xs: 2,
            },
            alignItems: "stretch",
          }}
        >
          <CustomerGrowthColumn />
          <NewCustomersColumn />
        </Box>
      </SectionWithTitle>
      <SectionWithTitle>
        <Box sx={{ zIndex: 0 }}>
          <AnalyticsTraffic />
        </Box>
      </SectionWithTitle>
    </div>
  );
};
