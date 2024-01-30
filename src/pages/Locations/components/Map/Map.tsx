import InfoWindow from "../InfoWindow/InfoWindow";
import { MAP_LOCATIONS as locations } from "../../../../mocks/mocks";
import "./map.css"; // modules wouldn't work with google map's elements
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  MarkerClustererF,
} from "@react-google-maps/api";
import {
  MarkerIconURL,
  MarkerClustererIconURL,
} from "../../../../assets/icons/customIcons";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useMap } from "../../../../hooks/useMap";
export const Map = () => {
  const { breakpoints } = useTheme();
  const xl = useMediaQuery(breakpoints.up("xl"));
  const {
    isLoaded,
    loadError,
    loadHandler,
    handleOnUnmount,
    infoOpen,
    setInfoOpen,
    zoom,
    selectedPlace,
    markerMap,
    markerClickHandler,
    markerLoadHandler,
  } = useMap(locations);
  if (!isLoaded) return <></>;
  if (loadError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">Sorry. Something went wrong</Typography>
      </Box>
    );
  }
  return (
    <GoogleMap
      onLoad={loadHandler}
      onUnmount={handleOnUnmount}
      onZoomChanged={() => {
        if (infoOpen) {
          setInfoOpen(false);
        }
      }}
      center={locations[0].position}
      zoom={zoom}
      mapContainerStyle={{
        height: `${xl ? "600px" : "300px"}`,
        width: "100%",
        borderRadius: "16px",
      }}
      options={{
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        fullscreenControl: false,
        streetViewControl: false,
      }}
    >
      {infoOpen && selectedPlace && (
        <InfoWindowF
          options={{
            disableAutoPan: true,
            pixelOffset: new window.google.maps.Size(115, 245),
          }}
          anchor={markerMap && markerMap[selectedPlace?.id]}
          onCloseClick={() => setInfoOpen(false)}
        >
          <InfoWindow
            Icon={StarHalfIcon} // to do logic to change Icon for % ranges
            imageURL={selectedPlace?.imageURL}
            kW={selectedPlace?.kW}
            kWp={selectedPlace?.kWp}
            title={selectedPlace?.title}
            PR={selectedPlace?.PR}
            id={selectedPlace?.id}
          />
        </InfoWindowF>
      )}
      <MarkerClustererF
        styles={[
          {
            url: MarkerClustererIconURL,
            height: 80,
            width: 80,
            textSize: 14,
            textColor: "#4d4d4d",
          },
        ]}
      >
        {(clusterer) => {
          return (
            <div>
              {locations?.map((place) => (
                <MarkerF
                  key={place.id}
                  position={place.position}
                  onLoad={(marker) => markerLoadHandler(marker, place)}
                  onClick={(event) => markerClickHandler(event, place)}
                  clusterer={clusterer}
                  icon={{
                    url: MarkerIconURL,
                    scaledSize: new google.maps.Size(45, 45),
                  }}
                />
              ))}
            </div>
          );
        }}
      </MarkerClustererF>
    </GoogleMap>
  );
};
