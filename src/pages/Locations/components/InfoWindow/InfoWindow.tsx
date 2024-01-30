import { Box, Button, Typography } from "@mui/material";
import styles from "./InfoWindow.module.scss";
import { useAppStore } from "../../../../store/appStore";
import { useNavigate } from "react-router-dom";
import { RoutePathname } from "../../../../utils/routing";
interface InfoWindowProps {
  imageURL: string;
  Icon: React.ElementType;
  kW: number;
  kWp: number;
  title: string;
  PR: number;
  id: number | string;
}

const InfoWindow = (props: InfoWindowProps) => {
  const { imageURL, Icon, kW, kWp, title, PR, id } = props;

  const navigate = useNavigate();
  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);
  const onEnterClickHandler = () => {
    const locationPath = id.toString().replace(" ", "").toLowerCase();
    setCurrentLocation(title);
    navigate(`${RoutePathname.Locations}/${locationPath}`);
  };
  return (
    <Box className={styles.infoWindowWrapper}>
      <Box
        component="img"
        className={styles.thumbnail}
        src={imageURL}
        alt="thumb"
      />

      <Box className={styles.description}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {Icon && <Icon sx={{ color: "#FFC107", fontSize: "1rem" }} />}
          <Typography variant="body2">{kW} kW</Typography>
          <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
            ({kWp}% kWp)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#171725" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#171725" }}>
          <strong>{PR}%</strong> PR
        </Typography>
        <Button
          sx={{
            marginTop: "0.5rem",
            mx: "auto",
            width: {
              xs: "5rem",
              xl: "11rem",
            },
          }}
          variant="contained"
          onClick={onEnterClickHandler}
        >
          ENTER
        </Button>
      </Box>
    </Box>
  );
};

export default InfoWindow;
