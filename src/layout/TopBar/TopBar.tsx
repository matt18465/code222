import {
  AppBar,
  Badge,
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "./TopBar.module.scss";
import { HeaderActionMenu } from "../HeaderActionMenu/HeaderActionMenu";
import { useAuthContext } from "../../state/auth-context";
import {
  ClockIcon,
  CustomLocationIcon,
  CustomSearchIcon,
  CustomSettings2Icon,
} from "../../assets/icons/customIcons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useThemeContext } from "../../state/theme-context";
import { useAppStore } from "../../store/appStore";
import { TimeModal } from "./components/TimeModal";
import { useState } from "react";
import { MAP_LOCATIONS } from "../../mocks/mocks";
import { RoutePathname } from "../../utils/routing";
export const TopBar = () => {
  let params = useParams();

  const { user } = useAuthContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationToggled, setIsLocationToggled] = useState(false);
  const isNavOpen = useAppStore((state) => state.isNavOpen);
  const setIsNavOpen = useAppStore((state) => state.setIsNavOpen);
  const handleDrawerOpen = () => {
    setIsNavOpen(!isNavOpen);
  };
  const { mode } = useThemeContext();
  const { breakpoints } = useTheme();
  const xs = useMediaQuery(breakpoints.up("xs"));
  const md = useMediaQuery(breakpoints.up("md"));
  const lg = useMediaQuery(breakpoints.up("lg"));
  const currentLocation = useAppStore((state) => state.currentLocation);
  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);
  const isTimeModalVisible = useAppStore((state) => state.isTimeModalVisible);
  const toggleTimeModalVisibility = useAppStore(
    (state) => state.toggleTimeModalVisibility
  );
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLocation = event.target.value;
    setCurrentLocation(newLocation);
    if (newLocation === "summary") {
      navigate(RoutePathname.Home);
      return;
    }
    const newLocationPath = newLocation.replace(" ", "").toLowerCase();
    navigate(`${RoutePathname.Locations}/${newLocationPath}`);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        maxWidth: 1,
        boxShadow: 0,
        displayPrint: "none",
        backgroundColor: "white",
        height: {
          xs: "5.5rem",
          sm: "4.5rem",
        },

        zIndex: {
          xs: 100,
          md: 1,
        },
        borderColor: mode === "dark" ? "#686868" : "",
        borderStyle: "solid",
        borderWidth: "0 0 1px 0",
      }}
    >
      <Toolbar
        className={styles.toolbar}
        sx={{
          padding: {
            xs: ".5rem 1rem .5rem",
            sm: ".5rem",
            md: "1.5rem",
          },
          boxShadow: mode === "dark" ? 0 : "rgba(0, 0, 0, 0.4) 0px 0px 6px 0px",
          backgroundColor: "lightBg",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: "1",
            width: "100%",
            display: "flex",
            gap: {
              xs: "1rem",
            },
            justifyContent: {
              xs: "center",
              sm: "flex-start",
            },
            alignItems: "center",
          }}
        >
          <Toolbar
            disableGutters={lg ? false : true}
            sx={{
              boxShadow: "none",
              marginLeft: {
                xs: "0",
              },
              paddingRight: {
                xs: 2,
                lg: "auto",
              },
              color: "black",
              paddingLeft: {
                xs: "0",
                md: "1rem",
              },
            }}
          >
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "#7e84a3",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            noWrap
            sx={{
              marginLeft: {
                xs: 0,
                sm: "-1.9rem",
              },
              minWidth: {
                xs: "5rem",
                md: "7rem",
              },
            }}
          >
            <Typography
              className={styles.logo}
              color="logoText"
              sx={{
                paddingTop: {
                  xs: ".1rem",
                  md: 0,
                },
                fontSize: "1.7rem",
              }}
            >
              TESTEMACS
            </Typography>
          </Link>
          {md || isSearchOpen === true ? (
            <TextField
              onBlur={() => {
                setIsSearchOpen(false);
              }}
              size={lg ? "medium" : "small"}
              autoFocus={true}
              placeholder={"Search..."}
              sx={{
                "input::placeholder": {
                  opacity: 1,
                  color: "searchPlaceholderText",
                },
                transition: ".3s all",
                borderWidth: "1px",
                borderColor: "#5A607F",
                borderStyle: "solid",
                backgroundColor: "#FFFFFF0D",
                color: "rgb(255,255,255,0.8)",
                height: {
                  xs: "2.2rem",
                  md: "2.7rem",
                },
                width: {
                  xs: 1,
                  md: "60%",
                  xl: 1,
                },
                paddingBottom: "0.5rem",
                paddingTop: "0 !important",
                marginLeft: {
                  xs: "0",
                  sm: "auto",
                  lg: "4.5rem",
                },
                borderRadius: "10px",
                maxWidth: {
                  xs: "100%",
                  lg: "20rem",
                },
              }}
              InputProps={{
                sx: {
                  color: "rgb(255,255,255,0.8)",
                  height: {
                    xs: "2.2rem",
                    md: "2.8rem",
                  },
                  paddingLeft: {
                    xs: ".2rem",
                    md: ".8rem",
                  },
                  borderRadius: "10px",
                },
                startAdornment: (
                  <InputAdornment position="end">
                    <CustomSearchIcon />
                  </InputAdornment>
                ),
              }}
              className={styles.searchInput}
            />
          ) : (
            <IconButton
              sx={{
                padding: {
                  xs: ".25rem",
                  md: "initial",
                },
                marginLeft: {
                  xs: "auto",
                  md: "initial",
                },
              }}
              onClick={() => setIsSearchOpen((state) => !state)}
            >
              <CustomSearchIcon
                sx={{
                  fontSize: {
                    xs: "1.5rem",
                    md: "2rem",
                  },
                }}
              />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            gap: {
              xs: ".5rem",
              sm: "initial",
            },
            display: !xs && isSearchOpen ? "none" : "flex",
            alignItems: "center",
            alignSelf: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          <IconButton
            sx={{
              marginRight: {
                xs: 0,
                md: "0.8rem",
              },
              "& path": {
                fill: mode === "dark" ? "rgb(255,255,255,0.5)" : "black",
                width: "3rem",
              },
              padding: {
                xs: "0",
                sm: ".25rem",
                md: 1,
              },
            }}
            onClick={toggleTimeModalVisibility}
          >
            <ClockIcon sx={{ fontSize: { xs: 22, md: 30 } }} />
          </IconButton>
          {/* {sm || isLocationToggled ? (
      
          ) : (
            <IconButton onClick={() => setIsLocationToggled(state => !state)}>
              <CustomLocationIcon
                sx={{
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          )} */}
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: {
                xs: "0",
                md: "1rem",
              },
              "& .MuiInputBase-root": {
                "&:hover": {
                  "& fieldset": {
                    borderColor:
                      mode === "dark" ? "rgb(255,255,255,0.4)" : "black",
                  },
                },
              },
            }}
          >
            <FormControl
              fullWidth
              sx={{
                "& button": {
                  padding: {
                    xs: ".25rem",
                    md: "initial",
                  },
                },
                "&:hover button": {
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "50%",
                },
              }}
            >
              <Select
                variant={lg ? "outlined" : "standard"}
                disableUnderline
                IconComponent={(props) =>
                  !lg ? (
                    <IconButton
                      {...props}
                      className={`material-icons ${props.className}`}
                      onClick={() => setIsLocationToggled((state) => !state)}
                    >
                      <CustomLocationIcon
                        sx={{
                          fontSize: {
                            xs: "1.5rem",
                            md: "2rem",
                          },
                          top: "unset",
                          right: "unset",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <ArrowDropDownIcon
                      {...props}
                      className={`material-icons ${props.className}`}
                    />
                  )
                }
                labelId="location-select"
                id="location-select"
                value={currentLocation}
                onChange={handleChange}
                label=""
                sx={
                  !lg
                    ? {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "2rem",
                        "& .MuiSelect-icon": {
                          top: {
                            xs: "unset",
                          },
                          right: {
                            xs: "unset",
                          },
                        },
                        fontSize: {
                          xs: "0",
                        },
                        boxShadow: "none",
                        "& .MuiSelect-iconOpen": {
                          transform: {
                            xs: "none",
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                        "& #location-select": {
                          height: "100%",
                          background: "transparent",
                        },
                        width: "2rem",
                      }
                    : { width: "13rem", height: "2.7rem" }
                }
              >
                <MenuItem value="summary">Summary</MenuItem>
                {MAP_LOCATIONS.map((location) => {
                  return (
                    <MenuItem key={location.id} value={location.title}>
                      {location.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: 1,
                  sm: 0,
                  md: 1,
                },
                ml: "auto",
              }}
            >
              <Tooltip title="Settings">
                <IconButton
                  sx={{
                    padding: {
                      xs: ".25rem",
                      md: "initial",
                    },
                  }}
                >
                  <CustomSettings2Icon
                    sx={{
                      paddingTop: {
                        xs: ".3rem",
                      },
                      paddingLeft: {
                        xs: ".3rem",
                      },

                      fontSize: {
                        xs: 26,
                        md: 28,
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Notifications"
                sx={{
                  padding: {
                    xs: ".25rem",
                    md: "initial",
                  },
                }}
              >
                <Badge color="error" overlap="circular" variant="dot">
                  <NotificationsIcon sx={{ fontSize: 22, color: "grey.400" }} />
                </Badge>
              </Tooltip>
              <Hidden only={["sm", "md", "xs"]}>
                <HeaderActionMenu />
              </Hidden>
            </Box>
          )}
        </Box>
      </Toolbar>
      {isTimeModalVisible && <TimeModal />}
    </AppBar>
  );
};
