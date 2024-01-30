import React, { ReactNode, CSSProperties } from "react";
import { Box, SxProps, useMediaQuery, useTheme } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

interface DroppableRowProps {
  droppableId: string;
  children?: ReactNode;
  styles?: SxProps;
}

export const DroppableRow = ({
  droppableId,
  children,
  styles,
}: DroppableRowProps) => {
  const { breakpoints } = useTheme();
  const xl = useMediaQuery(breakpoints.up("xl"));
  return (
    <Droppable droppableId={droppableId} direction="horizontal">
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            display: {
              xs: "grid",
              xl: "flex",
            },
            gridTemplateColumns: "1fr",
            gap: "12px",
            flexDirection: {
              xs: "column",
              xl: "row",
            },

            "& > .MuiBox-root": !xl
              ? {
                  width: 1,
                }
              : {},
            ...styles,
          }}
        >
          {children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
