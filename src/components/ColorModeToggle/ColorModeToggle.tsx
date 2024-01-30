import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Switch } from "@mui/material";

import { useThemeContext } from "../../state/theme-context";
import styles from "./ColorModeToggle.module.scss";

export const ColorModeToggle = () => {
  const { mode, setMode } = useThemeContext();

  return (
    <div className={styles.toggleColorMode}>
      <LightModeOutlinedIcon color="action" />
      <Switch
        checked={mode === "light"}
        onChange={(event) => setMode?.(event.target.checked ? "light" : "dark")}
        inputProps={{ "aria-label": "Switch color mode" }}
        sx={{
          p: "5px",
          width: 74,
          ".MuiSwitch-track": {
            borderRadius: "16px",
            backgroundColor: "grey.200",
          },
          ".MuiSwitch-thumb": {
            border: "4px solid white",
            backgroundColor: "primary.light",
          },
          ".Mui-checked": { transform: "translateX(35px) !important" },
        }}
      />
    </div>
  );
};
