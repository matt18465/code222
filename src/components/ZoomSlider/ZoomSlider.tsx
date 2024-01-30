import React from "react";
import { Box, useTheme } from "@mui/system";
import { Slider, IconButton } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

type ZoomSliderProps = {
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
};

const ZoomSlider = ({ zoomLevel, setZoomLevel }: ZoomSliderProps) => {
  const onZoomChangeHandler = (zoom: number) => {
    if (zoomLevel < 0) {
      setZoomLevel(0);
      return;
    }
    if (zoomLevel > 2) {
      setZoomLevel(2);
      return;
    }
    setZoomLevel(zoom);
  };
  return (
    <Box
      sx={{
        height: "80%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        disabled={zoomLevel >= 2}
        onClick={() => {
          onZoomChangeHandler(zoomLevel + 0.1);
        }}
      >
        <ZoomInIcon
          sx={{
            fontSize: "2rem",
          }}
        />
      </IconButton>
      <Slider
        size="small"
        defaultValue={1}
        value={zoomLevel}
        orientation="vertical"
        step={0.01}
        max={2}
        onChange={(e) => {
          onZoomChangeHandler((e.target as any).value);
        }}
        color="secondary"
      />
      <IconButton
        disabled={zoomLevel <= 0}
        onClick={() => {
          onZoomChangeHandler(zoomLevel - 0.1);
        }}
      >
        <ZoomOutIcon
          sx={{
            fontSize: "2rem",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default ZoomSlider;
