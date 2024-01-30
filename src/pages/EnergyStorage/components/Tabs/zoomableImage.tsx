import { Box, IconButton } from "@mui/material";
import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
type ZoomableImageProps = { src: string; alt: string };

const ZoomableImage = ({ src, alt }: ZoomableImageProps) => (
  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <TransformWrapper
      centerOnInit={true}
      wheel={{ activationKeys: ["Control"] }}
    >
      {({ zoomIn, zoomOut }) => {
        return (
          <React.Fragment>
            <Box
              sx={{
                position: "absolute",
                top: {
                  xs: "unset",
                  md: "0.5rem",
                },
                bottom: {
                  xs: 3,
                  md: "unset",
                },
                right: {
                  xs: "50%",
                  md: 50,
                },
                transform: {
                  xs: "translate(50%, 50%)",
                  md: "none",
                },
                zIndex: 100,
              }}
            >
              <IconButton onClick={() => zoomIn()} title="Zoom In">
                <ZoomInIcon />
              </IconButton>
              <IconButton onClick={() => zoomOut()} title="Zoom Out">
                <ZoomOutIcon />
              </IconButton>
            </Box>
            <TransformComponent wrapperStyle={{ flex: 1 }}>
              <Box
                component="img"
                src={src}
                alt={"thumb"}
                width="100%"
                sx={{
                  minHeight: {
                    xs: 200,
                    sm: 200,
                    md: 400,
                    xl: 500,
                  },
                  maxHeight: 500,
                  height: "100%",
                  paddingBottom: "2rem",
                }}
              />
            </TransformComponent>
          </React.Fragment>
        );
      }}
    </TransformWrapper>
  </Box>
);

export default ZoomableImage;
