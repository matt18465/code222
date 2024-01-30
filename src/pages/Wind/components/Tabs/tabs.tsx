import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Box, IconButton, Input, Tab, Tabs, Typography } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Menu from "@mui/material/Menu";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";

import { FullscreenView } from "../../../../components/FullscreenView/FullscreenView";
import { useThemeContext } from "../../../../state/theme-context";
import { useWindStore } from "../../../../store/windStore";
import { UploadIcon } from "../../../../assets/icons/customIcons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

export const TabsWithImages = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [uploadedImageSrc, setUploadedImageSrc] = React.useState<string | null>(
    null
  );

  const [newTabName, setNewTabName] = React.useState("");
  const [isCreatingNewTab, setIsCreatingNewTab] = React.useState(false);
  const [highlightedTabIndex, setHighlightedTabIndex] = React.useState(0);

  const { tabData, setTabVisibility, addNewTab, reorderTabs } = useWindStore(
    (state) => ({
      tabData: state.tabData,
      setTabVisibility: state.setTabVisibility,
      addNewTab: state.addNewTab,
      reorderTabs: state.reorderTabs,
    })
  );
  const [activeTabTitle, setActiveTabTitle] = React.useState(
    tabData[0].tabTitle
  );
  const handleAddNewTab = () => {
    if (newTabName.trim() !== "" && uploadedImageSrc) {
      addNewTab(newTabName.trim(), uploadedImageSrc);
      setNewTabName("");
      setIsCreatingNewTab(false);
    }
  };
  // Before rendering the Tabs component
  const visibleTabs = tabData.filter((tab) => tab.visibility);
  const value = tabData.findIndex((tab) => tab.tabTitle === activeTabTitle);

  const [menuPosition, setMenuPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  const visibleTabIndex = visibleTabs.findIndex(
    (tab) => tab.tabTitle === activeTabTitle
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const newActiveTitle = visibleTabs[newValue].tabTitle;
    setActiveTabTitle(newActiveTitle);
    const newHighlightedIndex = tabData.findIndex(
      (tab) => tab.tabTitle === newActiveTitle
    );
    setHighlightedTabIndex(newHighlightedIndex);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: target.bottom + window.scrollY,
      left: target.left + window.scrollX,
    });
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file && /^image\/svg\+xml/.test(file.type)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && e.target.result) {
          setUploadedImageSrc(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const { mode } = useThemeContext();

  const ZoomableImage = ({ src, alt }: { src: string; alt: string }) => (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <TransformWrapper
        centerOnInit={true}
        wheel={{ activationKeys: ["Control"] }}
      >
        {({ zoomIn, zoomOut }) => (
          <React.Fragment>
            <Box
              sx={{
                position: "absolute",
                top: {
                  xs: "unset",
                  md: "0.5rem",
                },
                bottom: {
                  xs: 3,
                  md: "unset",
                },
                right: {
                  xs: "50%",
                  md: 50,
                },
                transform: {
                  xs: "translate(50%, 50%)",
                  md: "none",
                },
                zIndex: 100,
              }}
            >
              <IconButton onClick={() => zoomIn()} title="Zoom In">
                <ZoomInIcon />
              </IconButton>
              <IconButton onClick={() => zoomOut()} title="Zoom Out">
                <ZoomOutIcon />
              </IconButton>
            </Box>
            <TransformComponent wrapperStyle={{ flex: 1 }}>
              <Box
                component="img"
                src={src}
                alt={"thumb"}
                width="100%"
                sx={{
                  minHeight: {
                    xs: 200,
                    sm: 200,
                    md: 400,
                    xl: 500,
                  },
                  height: "100%",
                  paddingBottom: "2rem",
                }}
              />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Box>
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={visibleTabIndex}
          onChange={handleChange}
          variant="scrollable"
          sx={{
            pr: {
              xs: "40px",
              md: "140px",
            },
            "& .Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.03)",
            },
            "& button": {
              pl: "1.5rem",
              pr: "1.4rem",
              py: "1.3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgb(255,255,255,0.1)",
              },
            },
          }}
          scrollButtons="auto"
        >
          {tabData.map(
            (tab, index) =>
              tab.visibility && (
                <Tab
                  key={tab.tabTitle}
                  label={tab.tabTitle}
                  {...a11yProps(index)}
                />
              )
          )}
          <Box
            sx={{
              height: "100%",
              minHeight: "3.7rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "1.7rem",
                fontSize: "1.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(255,255,255,0.1)",
                borderRadius: "100%",
                color: "text.primary",
                marginTop: "auto",
                marginBottom: "1rem",
                marginLeft: "0.5rem",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "rgb(255,255,255,0.05)",
                },
              }}
              onClick={handleMenuOpen}
            >
              +
            </Box>
          </Box>
        </Tabs>
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: "none" }}
          accept=".svg"
          onChange={handleFileChange}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: mode === "dark" ? "#323740" : "white",
              boxShadow: "none",
              borderWidth: "1px",
              borderColor:
                mode === "dark" ? "rgb(255,255,255,0.1)" : "rgb(0,0,0,0.2)",
              borderStyle: "solid",
              paddingTop: "0",
              top: `${menuPosition?.top}px !important`,
              left: `${menuPosition?.left}px !important`,
            },
            "& .MuiList-root": {
              paddingTop: "0",
              paddingBottom: "0",
            },
            marginTop: "0.95rem",
            marginLeft: {
              xs: "-15rem",
              md: "0.1rem",
            },
            "& li": {
              width: "17rem",
              display: "flex",
              justifyContent: "space-between",
              py: "0.6rem",
              height: "3.5rem",
              paddingLeft: "1.2rem",
            },
            "& .MuiSwitch-switchBase": {
              color: "#6b7a98",
            },
            "& .Mui-checked": {
              color: "text.primary",
            },
          }}
        >
          <MenuItem
            sx={{
              color: "text.primary",
              pr: "2rem",
              "& svg": {
                fill: (theme) => theme.palette.text.secondary,
                stroke: (theme) => theme.palette.text.secondary,
              },
              borderStyle: "solid",

              borderColor: "mainBorder",
              borderWidth: "0 0 1px 0",
            }}
            onClick={() => {
              setIsCreatingNewTab(true);
              inputFileRef?.current?.click();
            }}
          >
            Upload SVG
            <UploadIcon width="20px" height="20px" />
          </MenuItem>
          <DragDropContext
            onDragEnd={(result) => {
              const { source, destination } = result;
              if (!destination) {
                return;
              }
              if (source.index !== destination.index) {
                reorderTabs(source.index, destination.index);
              }
            }}
          >
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tabData.map((tab, index) => (
                    <Draggable
                      key={tab.tabTitle}
                      draggableId={tab.tabTitle}
                      index={index}
                    >
                      {(provided) => (
                        <MenuItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {tab.tabTitle}
                          <Switch
                            checked={tab.visibility}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => {
                              setTabVisibility(
                                index,
                                !tab.visibility,
                                activeTabTitle,
                                setActiveTabTitle,
                                setHighlightedTabIndex
                              );
                            }}
                          />
                        </MenuItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {isCreatingNewTab && (
            <MenuItem>
              <Input
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddNewTab();
                  }
                }}
                placeholder="Enter new tab name"
                autoFocus
              />
            </MenuItem>
          )}
        </Menu>
      </Box>

      {tabData.map((tab, index) => {
        if (value === index) {
          console.log("Tab on screen:", tab.tabTitle);
        }
        return (
          <TabPanel key={tab.tabTitle} value={value} index={index}>
            <ZoomableImage src={tab.image} alt={tab.tabTitle} />
            <FullscreenView
              title={tab.tabTitle}
              btnProps={{
                sx: { position: "absolute", top: "0.5rem", right: "0.3rem" },
              }}
            >
              <ZoomableImage src={tab.image} alt={tab.tabTitle} />
            </FullscreenView>
            <Typography
              sx={{ fontSize: 14, color: "#999", mt: 1, textAlign: "center" }}
            >
              ({tab.tabTitle})
            </Typography>
          </TabPanel>
        );
      })}
    </Box>
  );
};
