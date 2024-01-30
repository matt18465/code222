import { useLoadScript } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { appConfig } from "../app.config";
import { Location } from "../models/location";

export const useMap = (locations: Location[]) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: appConfig.GOOGLE_MAPS_API_KEY,
  });
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Location>({
    id: "",
    position: { lat: 0, lng: 0 },
    imageURL: "",
    kW: 0,
    kWp: 0,
    title: "",
    PR: 0,
  });
  const [markerMap, setMarkerMap] = useState<
    | {
        [key: string]: google.maps.Marker;
      }
    | undefined
  >();
  const [zoom, setZoom] = useState(7);
  const [infoOpen, setInfoOpen] = useState(false);
  const fitBounds = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.map((place) => {
      bounds.extend(place.position);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map: google.maps.Map) => {
    mapRef.current = map;
    fitBounds(map);
  };
  const handleOnUnmount = () => {
    if (mapRef?.current) {
      mapRef.current = null;
    }
  };
  const markerLoadHandler = (marker: google.maps.Marker, place: Location) =>
    setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  const markerClickHandler = (
    event: google.maps.MapMouseEvent,
    place: Location
  ) => {
    setSelectedPlace(place);
    if (mapRef?.current) {
      mapRef.current.setCenter(place.position);
    }
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
    if (zoom < 13) {
      setZoom(13);
    }
  };

  return {
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
  };
};
