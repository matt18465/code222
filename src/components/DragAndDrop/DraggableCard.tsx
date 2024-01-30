import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

export type CardWidthType = {
  [key: string]: string | number | { [size: string]: string };
};

interface DraggableCardProps {
  draggableId: string;
  cardIndex: number;
  children?: ReactNode;
  cardWidths?: CardWidthType;
}

export const DraggableCard = ({
  draggableId,
  cardIndex,
  children,
  cardWidths,
}: DraggableCardProps) => (
  <Draggable key={draggableId} draggableId={draggableId} index={cardIndex}>
    {(provided) => (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{
          width: cardWidths ? cardWidths[draggableId] || "100%" : "100%",
          display: "inline-flex",
          height: {
            xs: "auto",
          },
        }}
      >
        {children}
      </Box>
    )}
  </Draggable>
);
