import React, { CSSProperties } from "react";
import { ResponderProvided, DropResult } from "react-beautiful-dnd";

import { DraggableCard } from "../components/DragAndDrop/DraggableCard";
import { DroppableRow } from "../components/DragAndDrop/DroppableRow";
import { SxProps } from "@mui/material";

type RowOrderState<T extends string> = Record<string, T[]>;
type RowOrderDispatch<T extends string> = Record<
  string,
  React.Dispatch<React.SetStateAction<T[]>> | ((newOrder: T[]) => void)
>;
type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export const useDnD = <T extends string>(
  getCardById: (cardId: T) => JSX.Element | null,
  CARD_WIDTHS: Record<
    T,
    string | Record<string, string> | Record<Breakpoints, string>
  >,
  setRowOrders: RowOrderDispatch<T>,
  rowOrders: RowOrderState<T>
) => {
  const renderCard = (cardId: string, cardIndex: number) => (
    <DraggableCard
      draggableId={cardId}
      cardIndex={cardIndex}
      cardWidths={CARD_WIDTHS}
    >
      {getCardById(cardId as T)}
    </DraggableCard>
  );

  const renderDroppableRow = (
    droppableId: string,
    cardOrder: T[],
    styles?: SxProps
  ) => (
    <DroppableRow droppableId={droppableId} styles={styles}>
      {cardOrder.map((cardId: T, cardIndex: number) =>
        React.cloneElement(renderCard(cardId, cardIndex), { key: cardId })
      )}
    </DroppableRow>
  );

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;

    if (!destination) {
      console.log("Dropped outside the list");
      return;
    }

    const sourceList = [...rowOrders[source.droppableId]];
    const reorderedList = Array.from(sourceList);
    const [movedItem] = reorderedList.splice(source.index, 1);
    reorderedList.splice(destination.index, 0, movedItem);

    if (setRowOrders[source.droppableId]) {
      setRowOrders[source.droppableId](reorderedList);
    } else {
      console.error("Row order setting function not found");
    }
  };

  return { onDragEnd, renderCard, renderDroppableRow };
};
