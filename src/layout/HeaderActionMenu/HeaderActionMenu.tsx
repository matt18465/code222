import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";

import styles from "./HeaderActionMenu.module.scss";
import { useAuthContext } from "../../state/auth-context";
import { useNavigate } from "react-router-dom";
import { RoutePathname } from "../../utils/routing";

const options = ["Sign out"];

export const HeaderActionMenu = () => {
  const { user, signOut } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    switch (index) {
      case 0:
        signOut?.().then(() => navigate(RoutePathname.Login));
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav">
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            className={styles.actionInitializer}
            sx={{ color: "text.main" }}
          >
            <div className={styles.wrapper}>
              <Avatar
                sx={{
                  height: 36,
                  width: 36,
                  mr: "6px",
                  backgroundColor: "grey.400",
                }}
              >
                <PersonIcon sx={{ fontSize: "20px", color: "white" }} />
              </Avatar>
              <Typography fontSize={14} color="text.primary">
                {user?.name}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{ fontSize: "28px", color: "#7e84a3" }}
              />
            </div>
          </ListItemText>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            className={styles.menuItem}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
