import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { amber } from "@mui/material/colors";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
const COLOR_MODE_STORAGE_KEY = "colorMode";

type ColorMode = "light" | "dark";

export const ThemeContext = createContext<{
  mode: ColorMode;
  setMode?: Dispatch<SetStateAction<ColorMode>>;
}>({ mode: "light" });

interface ThemeContextProvideProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProvideProps) => {
  const [mode, setMode] = useState<ColorMode>(
    (localStorage.getItem(COLOR_MODE_STORAGE_KEY) as ColorMode) || "dark"
  );

  useEffect(() => {
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  }, [mode]);

  let theme = useMemo(() => {
    const darkMode = mode === "dark";
    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 300,
          md: 600,
          lg: 900,
          xl: 1200,
          xxl: 1536,
        },
      },
      typography: {
        fontFamily: [
          "Poppins",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
      },
      palette: {
        mode,
        ...(mode === "light"
          ? {
              // palette values for light mode
              darkBg: "#F4F7FC",
              lightBg: "white",
              navActiveBg: "rgb(242, 247, 255)",
              navItemText: "black",
              logoText: "rgb(117, 117, 117)",
              searchPlaceholderText: "rgb(0,0,0,0.8)",
              outlinedButtonBorder: "rgb(0,0,0,0.8)",
              mainIcon: "rgb(0,0,0,0.8)",
              mainBorder: "rgb(0,0,0,0.5)",
            }
          : {
              // palette values for dark mode
              darkBg: "#33373f",
              lightBg: "#43474f",
              navActiveBg: "rgb(105, 99, 204)",
              navItemText: "white",
              logoText: "#9692D9",
              searchPlaceholderText: "rgb(126, 132, 163)",
              outlinedButtonBorder: "rgb(255,255,255,0.3)",
              mainIcon: "rgb(126, 132, 163)",
              mainBorder: "rgb(255,255,255,0.15)",
            }),
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "rgb(255,255,255,0.07)",
              background: darkMode ? "#43474f" : "white",
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: "none",
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: {
              minHeight: 20,
              height: 20,
              boxShadow: "0px 0px 6px 0px rgba(0,0,0,.4)",
            },
          },
        },
        MuiSwitch: {
          styleOverrides: {
            track: {
              backgroundColor: darkMode
                ? "white!important"
                : "#33373f!important",
            },
            switchBase: {
              "&.Mui-checked ": {
                color: "#33373f",
              },
            },
          },
        },
        MuiSlider: {
          styleOverrides: {
            root: {
              color: darkMode ? "white!important" : "#33373f!important",
            },
            track: {
              backgroundColor: darkMode
                ? "white!important"
                : "#33373f!important",
            },
            rail: {
              color: darkMode ? "white!important" : "#33373f!important",
              "&.Mui-checked ": {
                color: "#33373f",
              },
            },
            thumb: {
              color: darkMode ? "white!important" : "#33373f",
              "&:hover": {
                boxShadow: "0px 0px 0px 8px rgba(51, 55, 63, .25)",
              },
              "&.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(51, 55, 63, .25)",
              },
            },
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            root: {
              backgroundImage: "unset",
              backgroundColor: darkMode
                ? "#3d4149"
                : "rgba(255, 255, 255, 0.7)",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderBottom: darkMode
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
    });
  }, [mode]);

  const value = {
    mode,
    setMode,
  };

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
