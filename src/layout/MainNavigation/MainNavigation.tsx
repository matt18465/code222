import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import styles from "./MainNavigation.module.scss";
import { LEFT_NAV_MENU } from "../../utils/left-menu.const";
import { ColorModeToggle } from "../../components/ColorModeToggle/ColorModeToggle";
import { useThemeContext } from "../../state/theme-context";
import Drawer from "@mui/material/Drawer";

import { useAppStore } from "../../store/appStore";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export const MainNavigation = () => {
  const isNavOpen = useAppStore((state) => state.isNavOpen);
  const setIsNavOpen = useAppStore((state) => state.setIsNavOpen);
  const { mode } = useThemeContext();
  const { breakpoints } = useTheme();

  const sm = useMediaQuery(breakpoints.up("sm"));
  const md = useMediaQuery(breakpoints.up("md"));
  const lg = useMediaQuery(breakpoints.up("lg"));

  return (
    <Box
      className={styles.menu}
      sx={{
        backgroundColor: "lightBg",
      }}
    >
      <SwipeableDrawer
        disableAutoFocus={true}
        className={styles.drawer}
        sx={{
          zIndex: { xs: 1, lg: "-1" },
          "& .MuiDrawer-paper": {
            width: 248,
            boxSizing: "border-box",
            backgroundColor: "lightBg",
            marginTop: {
              xs: "5em",
              sm: "4.5rem",
            },
          },
        }}
        variant={lg ? "persistent" : "temporary"}
        anchor="left"
        open={isNavOpen ? true : false}
        onClose={() => setIsNavOpen(false)}
        onOpen={() => setIsNavOpen(true)}
      >
        <List>
          {LEFT_NAV_MENU.map((item, index) => (
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.path}
              className={styles.navLink}
              sx={{
                pl: 4,
                borderLeft: "4px solid transparent",
                color: "text.primary",
                "&.active":
                  mode === "dark"
                    ? { borderColor: "white", color: "white" }
                    : {
                        borderColor: "rgb(0, 88, 255)",
                        color: "rgb(0, 88, 255)",
                      },
                "&:hover, &.active":
                  mode === "dark"
                    ? { backgroundColor: "navActiveBg" }
                    : { backgroundColor: "navActiveBg" },
              }}
            >
              <ListItemIcon sx={{ color: "rgb(126, 132, 163)", minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize={14}>{item.name}</Typography>
              </ListItemText>
              {item.counter && (
                <Badge
                  sx={{
                    mr: 2,
                    "& span": {
                      backgroundColor: "rgb(255,255,255,0.1)",
                      borderColor: "#8882FB",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      fontSize: "0.75rem",
                      height: "1.5rem",
                      width: "1.6rem",
                      borderRadius: "100px",
                      color: "text.primary",
                    },
                  }}
                  badgeContent={item.counter}
                  color="error"
                ></Badge>
              )}
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: 5 }}>
          <ColorModeToggle />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};
