import React, { useEffect, useState } from "react";
import { Alert, Box, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import ZoomableImage from "./zoomableImage";
import { FullscreenView } from "../../../../components/FullscreenView/FullscreenView";
import { useMatch, useParams } from "react-router-dom";
import TabMenu from "./tabMenu";
import { useTabsStore } from "../../../../store/tabsStore";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

export const TabsWithImages = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  let { locationId } = useParams();

  const match = useMatch(`/locations/${locationId}/:currentPageSlug`);
  const pathName = match?.params?.currentPageSlug;
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const [highlightedTabIndex, setHighlightedTabIndex] = useState(0);

  const {
    tabData,
    setTabData,
    reorderTabs,
    setTabOrder,

    isTabHidden,
  } = useTabsStore((state) => ({
    tabData: state.tabData,
    setTabData: state.setTabData,
    isTabHidden: state.isTabHidden,
    setTabOrder: state.setTabOrder,
    getTabOrder: state.getTabOrder,
    setTabIsHidden: state.setTabIsHidden,
    reorderTabs: state.reorderTabs,
  }));
  const [activeTabId, setActiveTabId] = useState("");

  // Before rendering the Tabs component
  const visibleTabs = tabData?.filter((tab) => !isTabHidden(tab?.id));
  const value = tabData?.findIndex((tab) => tab?.id === activeTabId) || 0;

  const handleChangeActiveTabId = (
    event: React.SyntheticEvent | null,
    newValue: number
  ) => {
    const newActiveId = visibleTabs?.[newValue]?.id || "";
    setActiveTabId(newActiveId);
    const newHighlightedIndex =
      tabData?.findIndex((tab) => tab?.id === newActiveId) || 0;
    setHighlightedTabIndex(newHighlightedIndex);
  };

  useEffect(() => {
    if (!tabData) {
      setTabData(locationId!, pathName!);
    }
    if (!activeTabId && tabData?.length) {
      setActiveTabId(tabData[0]?.id);
    }
    handleChangeActiveTabId(null, 0);
  }, [tabData]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={highlightedTabIndex}
          onChange={handleChangeActiveTabId}
          variant="scrollable"
          sx={{
            pr: {
              xs: "40px",
              md: "140px",
            },
            "& .Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.03)",
            },
          }}
          scrollButtons="auto"
        >
          {tabData?.map(
            (tab, index) =>
              !isTabHidden(tab?.id) && (
                <Tab key={tab?.id} label={tab?.title} {...a11yProps(index)} />
              )
          )}
          <TabMenu
            handleChangeActiveTabId={handleChangeActiveTabId}
            setTabOrder={setTabOrder}
            reorderTabs={reorderTabs}
            tabData={tabData}
            setTabData={setTabData}
            setActionMessage={setActionMessage}
            setSnackbarOpen={setSnackbarOpen}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
          />
        </Tabs>
      </Box>
      {!tabData?.length ? (
        <Typography
          sx={{
            textAlign: "center",
            py: 4,
          }}
        >
          No tabs to display
        </Typography>
      ) : (
        tabData?.map((tab, index) => {
          if (value === index) {
            console.log("Tab on screen:", tab?.title);
          }

          return (
            <TabPanel key={tab?.id} value={value} index={index}>
              {tab?.image && <ZoomableImage src={tab.image} alt={tab?.title} />}
              <FullscreenView
                title={tab?.title}
                btnProps={{
                  sx: { position: "absolute", top: "0.5rem", right: "0.3rem" },
                }}
              >
                {tab?.image && (
                  <ZoomableImage src={tab.image} alt={tab?.title} />
                )}
              </FullscreenView>
              <Typography
                sx={{ fontSize: 14, color: "#999", mt: 1, textAlign: "center" }}
              >
                ({tab?.title})
              </Typography>
            </TabPanel>
          );
        })
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {actionMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
