import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import styles from "./SectionWithTitle.module.scss";
import { useSectionStore } from "../../store/sectionStore";
import { EditIcon } from "../../assets/icons/customIcons";
import { useThemeContext } from "../../state/theme-context";
import { UpDownArrows } from "../UpDownArrows/UpDownArrows";
import { useHomeStore } from "../../store/homeStore";
import { useSectionScroll } from "../../hooks/useSectionScroll";
import { UpDownArrowsFullPage } from "../UpDownArrows/UpDownArrowsFullPage";
import { SectionTitles } from "../../models/sections";

interface SectionProps {
  children?: React.ReactNode;
  title?: string;
  arrows?: React.ReactNode;
  id?: string;
  multipleRows?: boolean;
}

export const SectionWithTitleFullPage = ({
  children,
  title,
  arrows,
  id,
  multipleRows,
}: SectionProps) => {
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up("lg"));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ID = title || id;
  const { mode } = useThemeContext();
  const { isHidden, setIsHidden } = useSectionStore();
  const slug = pathname.replaceAll("/", "");
  const [hidden, setHidden] = useState<boolean>(false);
  const [hiddenRows, setHiddenRows] = useState<{ [key: string]: boolean }>({});
  const toggleHiddenHandler = (rowNumber: number) => {
    const sectionName = sections[rowNumber - 1];
    const currentHiddenState = isHidden(`${sectionName}`);
    setIsHidden(`${sectionName}`, !currentHiddenState);
  };

  const handleTitleClick = () => {
    if (title === "PV PERFORMANCE") {
      navigate("pv");
    } else if (title === "WIND PERFORMANCE") {
      navigate("wind");
    } else if (title === "ESS PERFORMANCE") {
      navigate("energy-storage");
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const {
    sections,
    moveUp,
    moveDown,
    setRow1Order,
    setRow2Order,
    setRow3Order,
    row1Order,
    row2Order,
    row3Order,
  } = useHomeStore();
  const { setSectionToScroll, sectionRefs } = useSectionScroll(sections);

  return (
    <Box className={`${styles.section} ${hidden && styles.hidden}`}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          py: { xs: ".5rem", xl: "initial" },
        }}
      >
        <Typography
          variant={lg ? "h5" : "body1"}
          sx={{
            color: hidden ? "text.secondary" : "text.primary",
            opacity: hidden ? ".8" : "1",

            cursor:
              title === "Overview - all power plants" ||
              title === "PV PERFORMANCE" ||
              title === "WIND PERFORMANCE" ||
              title === "ESS PERFORMANCE"
                ? "pointer"
                : "default",
          }}
          onClick={handleTitleClick}
        >
          {sections[0] === id && "Overwiew - all power plants"}
        </Typography>
        {!multipleRows && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".8rem",
              fontSize: "2rem",
            }}
          >
            <IconButton
              onClick={handleMenuOpen}
              size="large"
              sx={{
                "& *": {
                  fill:
                    mode === "dark" ? "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)",
                },
                "&:hover *": {
                  fill:
                    mode === "dark" ? "rgb(255,255,255,0.8)" : "rgb(0,0,0,0.8)",
                },
                marginBottom: "0.5rem",
              }}
            >
              <EditIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                left: "-1.3rem",
                "& .MuiPaper-root": {
                  backgroundColor: mode === "dark" ? "#323740" : "white",
                  boxShadow: "none",
                  borderWidth: "1px",
                  borderColor:
                    mode === "dark" ? "rgb(255,255,255,0.1)" : "rgb(0,0,0,0.2)",
                  borderStyle: "solid",
                  paddingTop: "0",
                },
                "& .MuiList-root": {
                  paddingTop: "0",
                  paddingBottom: "0",
                },
              }}
            >
              {[1, 2, 3, 4].map((rowNumber) => {
                return (
                  <Box sx={{ display: "flex" }} key={rowNumber}>
                    <MenuItem
                      sx={{
                        paddingTop: "0.7rem",
                        paddingBottom: "0.7rem",
                        display: "flex",
                        flexDirection: "row",
                      }}
                      onClick={handleMenuClose}
                    >
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Box
                          sx={{
                            marginRight: "1rem",
                            width: "2rem",
                            textAlign: "center",
                          }}
                        >
                          {rowNumber}
                        </Box>
                        {/* Arrows that move this section up and down in homepage */}
                        <UpDownArrowsFullPage
                          rowNumber={rowNumber}
                          moveUp={moveUp}
                          moveDown={moveDown}
                          setSectionToScroll={setSectionToScroll}
                          sectionTitle={
                            sections[rowNumber - 1] as SectionTitles
                          }
                        />
                      </Box>
                      {/* Switch to hide/show this particular section/row in homepage */}
                      <FormGroup>
                        <FormControlLabel
                          sx={{
                            marginRight: "-1rem",
                            marginLeft: "0.5rem",
                            color: "text.primary",
                          }}
                          control={
                            <Switch
                              checked={isHidden(`${sections[rowNumber - 1]}`)}
                              onChange={() => toggleHiddenHandler(rowNumber)}
                              size={lg ? "medium" : "small"}
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                    </MenuItem>
                  </Box>
                );
              })}
            </Menu>
          </Box>
        )}
      </Box>

      {!hidden && <Box className={styles.content}>{children}</Box>}
    </Box>
  );
};
