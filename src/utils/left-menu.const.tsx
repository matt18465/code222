import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import WindPowerIcon from "@mui/icons-material/WindPower";

import { RoutePathname } from "./routing";
import {
  CustomBriefcaseIcon,
  CustomCalendarIcon,
  CustomDashboardIcon,
  CustomHelpIcon,
  CustomHomeIcon,
  CustomInvoiceIcon,
  CustomLocationIcon,
  CustomSettingsIcon,
  CustomUsersIcon,
} from "../assets/icons/customIcons";

export interface NavMenu {
  icon: React.ReactNode;
  name: string;
  path: string;
  counter?: number;
}

export const LEFT_NAV_MENU: NavMenu[] = [
  {
    icon: <CustomHomeIcon />,
    name: "Home",
    path: RoutePathname.Home,
  },
  {
    icon: <CustomDashboardIcon />,
    name: "Analytics",
    path: RoutePathname.Analytics,
  },
  {
    icon: <CustomLocationIcon />,
    name: "Locations",
    path: "/locations",
    counter: 16,
  },
  {
    icon: <CustomInvoiceIcon />,
    name: "Documentation",
    path: "/documentation",
  },
  {
    icon: <CustomUsersIcon />,
    name: "Customers",
    path: "/customers",
  },
  {
    icon: <CustomBriefcaseIcon />,
    name: "Projects",
    path: "/projects",
  },
  {
    icon: <CustomCalendarIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <CustomHelpIcon />,
    name: "Help center",
    path: "/help-center",
  },
  {
    icon: <CustomSettingsIcon />,
    name: "Settings",
    path: "/settings",
  },
];
