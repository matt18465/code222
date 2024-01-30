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
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
interface SectionProps {
  children?: React.ReactNode;
  title?: string;
  arrows?: React.ReactNode;
  id?: string;
}

export const SectionWithTitle = ({
  children,
  title,
  arrows,
  id,
}: SectionProps) => {
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up("lg"));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ID = title || id;
  const { isHidden, setIsHidden } = useSectionStore();
  const slug = pathname.replaceAll("/", "");
  const [hidden, setHidden] = useState<boolean>(false);
  const toggleHiddenHandler = () => {
    setHidden((prevState) => !prevState);
    handleDropdownClose();
  };

  useEffect(() => {
    if (isHidden(`${ID}`)) {
      setHidden(true);
    }
  }, []);

  useEffect(() => {
    setIsHidden(`${ID}`, hidden);
  }, [hidden, pathname]);

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

  const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const { mode } = useThemeContext();
  const isSectionTitleLink =
    title === "Overview - all power plants" ||
    title === "PV PERFORMANCE" ||
    title === "WIND PERFORMANCE" ||
    title === "ESS PERFORMANCE";
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
            display: "flex",
            alignItems: "center",
            color: hidden
              ? isSectionTitleLink
                ? "#1976d2"
                : "text.secondary"
              : isSectionTitleLink
              ? "#1976d2"
              : "text.primary",
            opacity: hidden ? ".8" : "1",
            cursor: isSectionTitleLink ? "pointer" : "default",
            "&:hover": {
              transition: ".3s all",
              opacity: 0.9,
            },
          }}
          onClick={handleTitleClick}
        >
          {hidden && !title ? <>Hidden section</> : title}
          {isSectionTitleLink && (
            <IconButton
              sx={{
                ml: 0.5,
                fontSize: "2rem",
              }}
            >
              <ArrowCircleRightIcon
                sx={{
                  color: "#1976d2",
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          )}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".8rem",
            fontSize: "2rem",
          }}
        >
          <IconButton
            onClick={handleDropdownOpen}
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
            onClose={handleDropdownClose}
            sx={{
              left: "-2.8rem",
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
            <MenuItem>
              {arrows && (
                <Box
                  sx={{
                    width: "4rem",
                    color: "text.primary",
                    "& svg": {
                      fontSize: {
                        xs: "1.2rem",
                        lg: "1.9rem",
                      },
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": {
                        transform: "scale(1.2)",
                      },
                    },
                  }}
                  onClick={handleDropdownClose}
                >
                  {arrows}
                </Box>
              )}
              <FormGroup>
                <FormControlLabel
                  sx={{
                    color: "text.primary",
                    paddingLeft: "1rem",
                    marginRight: arrows ? "-0.8rem" : "0rem",
                  }}
                  control={
                    <Switch
                      checked={hidden}
                      onChange={toggleHiddenHandler}
                      size={lg ? "medium" : "small"}
                    />
                  }
                  label=""
                />
              </FormGroup>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {!hidden && <Box className={styles.content}>{children}</Box>}
    </Box>
  );
};
