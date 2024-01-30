import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Map } from "./components/Map/Map";
import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import styles from "./Locations.module.scss";
import { TwoColumnsText } from "../../components/TwoColumnsText/TwoColumnsText";
import {
  ENERGY_STORAGE_SYSTEM_LEFT,
  ENERGY_STORAGE_SYSTEM_RIGHT,
} from "../../utils/consts";
import { useThemeContext } from "../../state/theme-context";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { RoutePathname } from "../../utils/routing";

const rows = [
  {
    name: "Location 1",
    country: "Toruński",
    type: "ESS",
    maxPower: "12",
  },
  {
    name: "Location 2",
    country: "Gdański",
    type: "PV",
    maxPower: "4",
  },
];

export const Locations = () => {
  const { mode } = useThemeContext();

  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);
  const navigate = useNavigate();

  const handleRowClick = (locationName: string) => {
    setCurrentLocation(locationName);
    const newLocationPath = locationName.replace(" ", "").toLowerCase();
    navigate(`${RoutePathname.Locations}/${newLocationPath}`);
  };

  return (
    <div className={styles.sectionsWrapper}>
      <SectionWithTitle title="Map">
        <TableContainer
          component={Paper}
          sx={{
            marginBottom: "3rem",
            maxWidth: "100%",
            "& *": {
              fontSize: "1rem !important",
            },
            "& td": {
              width: "25%",
            },
            "& tr th": {
              color: "text.secondary",
            },
            "& tbody tr:hover": {
              backgroundColor: mode === "dark" ? "#464a53" : "rgb(0,0,0,0.03)",
              cursor: "pointer",
            },
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>MaxPower [MWp]</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  onClick={() => handleRowClick(row.name)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.maxPower}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px",
            minHeight: {
              xs: "300px",
              xl: "600px",
            },
          }}
        >
          <Map />
        </Box>
      </SectionWithTitle>
    </div>
  );
};
