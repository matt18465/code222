import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  IconButton,
  Input,
  Snackbar,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import { v4 as uuidv4 } from "uuid";
import ZoomableImage from "./zoomableImage";
import { FullscreenView } from "../../../../components/FullscreenView/FullscreenView";
import { useThemeContext } from "../../../../state/theme-context";

import { EditIcon } from "../../../../assets/icons/customIcons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { storage } from "../../../../../firebase.js";
import { ref, uploadBytes } from "firebase/storage";
import { db } from "../../../../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import UploadModal from "./uploadModal";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveDialog from "./removeDialog";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { TabData, useTabsStore } from "../../../../store/tabsStore";

type TabMenuProps = {
  tabData: TabData[] | null;
  handleChangeActiveTabId: (
    event: React.SyntheticEvent | null,
    newValue: number
  ) => void;
  setActionMessage: (message: string) => void;
  setSnackbarOpen: (open: boolean) => void;
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  setTabData: (location: string, page: string) => void;
  reorderTabs: (startIndex: number, endIndex: number) => void;
  setTabOrder: (id: string, order: number) => void;
};

const TabMenu = ({
  handleChangeActiveTabId,
  tabData,
  setTabData,
  setActionMessage,
  setSnackbarOpen,
  activeTabId,
  setActiveTabId,
  reorderTabs,
  setTabOrder,
}: TabMenuProps) => {
  const { setTabIsHidden, isTabHidden, getTabOrder } = useTabsStore(
    (state) => ({
      isTabHidden: state.isTabHidden,
      getTabOrder: state.getTabOrder,
      setTabIsHidden: state.setTabIsHidden,
    })
  );
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  let { locationId } = useParams();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const match = useMatch(`/locations/${locationId}/:currentPageSlug`);
  const pathName = match?.params?.currentPageSlug;
  const [newTabName, setNewTabName] = useState("");
  const [isCreatingNewTab, setIsCreatingNewTab] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditedTab, setCurrentEditedTab] = useState<TabData | null>(
    null
  );
  const [highlightedTabIndex, setHighlightedTabIndex] = useState(0);
  const { palette } = useTheme();
  const { mode } = useThemeContext();

  const tabsCollectionRef = collection(
    db,
    "locations",
    `${locationId}`,
    "pages",
    `${[pathName]}`,
    "tabs"
  );
  const handleAddNewTab = async () => {
    if (newTabName.trim() !== "" && imageUpload) {
      const id = uuidv4();
      const imageRef = ref(
        storage,
        `assets/energy-storage/tabs/${imageUpload?.name + id}`
      );
      let imgpath = "";

      try {
        await uploadBytes(imageRef, imageUpload).then((snapshot) => {
          imgpath = snapshot.metadata.fullPath;
        });
        const addNewDoc = await addDoc(tabsCollectionRef, {
          title: newTabName,
          image: imgpath,
        });
        setActionMessage(`Tab ${newTabName} added succesfully`);
        setSnackbarOpen(true);
        await setTabData(locationId!, pathName!);
        const lastTab = tabData?.length ? tabData[tabData?.length - 1] : null;
        const newOrder = lastTab?.order ? lastTab.order : tabData?.length ?? 0;
        setTabOrder(addNewDoc.id, newOrder);
        handleMenuClose();
        handleChangeActiveTabId(null, tabData?.length || 0);
      } catch (err) {
        console.error(err);
      }
      setNewTabName("");
      setIsCreatingNewTab(false);
      setImageUpload(null);
    }
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
    setImageUpload(null);
    setIsCreatingNewTab(false);
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          minHeight: "3.7rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={handleMenuOpen}
          size="large"
          sx={{
            "& *": {
              fill: mode === "dark" ? "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)",
            },
            "&:hover *": {
              fill: mode === "dark" ? "rgb(255,255,255,0.8)" : "rgb(0,0,0,0.8)",
            },
            ml: "0.5rem",
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
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
        <UploadModal
          setIsCreatingNewTab={setIsCreatingNewTab}
          setImageUpload={setImageUpload}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          imageUpload={imageUpload}
        />

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
                {tabData?.map((tab, index) => {
                  return (
                    <Draggable
                      key={tab?.id || tab?.title}
                      draggableId={tab?.id}
                      index={getTabOrder(tab.id)}
                    >
                      {(provided) => (
                        <MenuItem
                          sx={{ width: "17rem" }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Typography
                            sx={{
                              mr: "auto",
                            }}
                          >
                            {tab?.title}
                          </Typography>
                          <Switch
                            checked={isTabHidden(tab?.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setTabIsHidden(
                                tab?.id,
                                !isTabHidden(tab?.id),
                                activeTabId,
                                setActiveTabId,
                                setHighlightedTabIndex
                              );
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              setCurrentEditedTab(tab);
                              setConfirmDialogOpen(true);
                            }}
                            sx={{
                              transition: ".3s all",
                              "&:hover": {
                                color: "red",
                              },
                            }}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </MenuItem>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {!isCreatingNewTab && (
          <MenuItem
            sx={{
              color: "text.primary",
              pr: "2rem",
              "& svg": {
                fill: (theme) => theme.palette.text.secondary,
                stroke: (theme) => theme.palette.text.secondary,
              },
              width: "17rem",
              borderStyle: "solid",

              borderColor: "mainBorder",
              borderWidth: "1px 0 1px 0",
            }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add new tab
            <AddIcon width="20px" height="20px" />
          </MenuItem>
        )}

        {isCreatingNewTab && imageUpload && !isModalOpen && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              maxWidth: "17rem",
            }}
          >
            <MenuItem sx={{ maxWidth: "15rem" }}>
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

            <IconButton
              sx={{
                background: palette.background.paper,
                maxHeight: "40px",
                width: "auto",
                mr: 3.5,
              }}
              onClick={handleAddNewTab}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Menu>
      <RemoveDialog
        currentEditedTab={currentEditedTab}
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        setActionMessage={setActionMessage}
        setTabData={setTabData}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
};

export default TabMenu;
