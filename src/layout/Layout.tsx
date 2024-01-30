import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./Layout.module.scss";
import { MainNavigation } from "./MainNavigation/MainNavigation";
import { RoutePathname } from "../utils/routing";
import { TopBar } from "./TopBar/TopBar";
import { useAppStore } from "../store/appStore";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isNavOpen = useAppStore((state) => state.isNavOpen);
  const isLoginPage = location.pathname === RoutePathname.Login;

  return (
    <Box
      className={`${styles.root} ${isLoginPage ? styles.loginPage : ""}`}
      sx={{
        backgroundColor: "darkBg",
      }}
    >
      {!isLoginPage && (
        <div className={styles.header}>
          <TopBar />
        </div>
      )}
      <Box
        className={styles.pageWrapper}
        sx={{ backgroundColor: "background.default" }}
      >
        {!isLoginPage && (
          <Box
            className={styles.nav}
            sx={{
              width: isNavOpen ? "100%" : "0",
              maxWidth: "248px",
              height: "100%",
              zIndex: "0",
              position: "fixed",
            }}
          >
            <MainNavigation />
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
            maxHeight: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            paddingLeft: isNavOpen
              ? {
                  xs: "1rem",
                  lg: "18rem",
                }
              : "0",
            transition: isNavOpen ? "0.2s" : "0.3s",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
