import React, { useEffect } from "react";

import { MOCK_CHART_WIDGETS } from "../../mocks/mocks";
import { Box, Card, CardContent } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import styles from "./home.module.scss";
import { CardIds, useHomeStore } from "../../store/homeStore";
import { useSectionScroll } from "../../hooks/useSectionScroll";
import { UpDownArrows } from "../../components/UpDownArrows/UpDownArrows";
import { useDnD } from "../../hooks/useDnd";
import { ChartWidget } from "../../components/ChartWidget/ChartWidget";
import { GeoColumn } from "./components/GeoColumn";
import { VisitorsColumn } from "./components/VisitorsColumn";
import { SalesColumn } from "./components/SalesColumn";
import { GenerationColumn } from "./components/GenerationColumn";
import { ESSSchedule } from "./components/ESSSchedule";
import { useAppStore } from "../../store/appStore";
import { useSectionStore } from "../../store/sectionStore";
import { SectionWithTitleFullPage } from "../../components/SectionWithTitle/SectionWithTitleFullPage";

const CARD_WIDTHS = {
  // Overview - all plants row
  "home-row1-column1": {
    xs: "100%",
    xl: "33%",
  },
  "home-row1-column2": {
    xs: "100%",
    xl: "33%",
  },
  "home-row1-column3": {
    xs: "100%",
    xl: "33%",
  },
  // Geo / Vistiors row
  "home-row2-column1": {
    xs: "100%",
    xxl: "77%",
  },
  "home-row2-column2": {
    xs: "100%",
    xxl: "22%",
  },
  // Sales / Generation row
  "home-row3-column1": {
    xs: "100%",
    xxl: "64%",
  },
  "home-row3-column2": {
    xs: "100%",
    xxl: "35%",
  },
};

type CardID = keyof typeof CARD_WIDTHS;

export const Home = () => {
  const {
    sections,
    moveUp,
    moveDown,
    setRow1Order,
    setRow2Order,
    setRow3Order,
    row1Order,
    row2Order,
    row3Order,
  } = useHomeStore();
  const { setSectionToScroll, sectionRefs } = useSectionScroll(sections);
  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);

  useEffect(() => {
    setCurrentLocation("summary");
  }, []);
  const setRowOrders: Record<
    string,
    React.Dispatch<React.SetStateAction<CardIds[]>>
  > = {
    "row-1": setRow1Order,
    "row-2": setRow2Order,
    "row-3": setRow3Order,
  };

  const rowOrders = {
    "row-1": row1Order,
    "row-2": row2Order,
    "row-3": row3Order,
  };
  const { isHidden } = useSectionStore();
  const RenderChartWidget = ({ index }: { index: number }) => {
    if (index >= MOCK_CHART_WIDGETS.length) return null;

    const widgetData = MOCK_CHART_WIDGETS[index];
    return (
      <Card
        key={index}
        sx={{
          backgroundColor: "lightBg",
          width: 1,
        }}
      >
        <CardContent>
          <ChartWidget {...widgetData} timeline={true} />
        </CardContent>
      </Card>
    );
  };

  const getCardById = (cardId: CardID) => {
    switch (cardId) {
      case "home-row1-column1":
        return <RenderChartWidget index={0} />;
      case "home-row1-column2":
        return <RenderChartWidget index={1} />;
      case "home-row1-column3":
        return <RenderChartWidget index={2} />;
      case "home-row2-column1":
        return <GeoColumn />;
      case "home-row2-column2":
        return <VisitorsColumn />;
      case "home-row3-column1":
        return <SalesColumn />;
      case "home-row3-column2":
        return <GenerationColumn />;
      default:
        return null;
    }
  };

  const { onDragEnd, renderDroppableRow } = useDnD(
    getCardById,
    CARD_WIDTHS,
    setRowOrders,
    rowOrders
  );

  return (
    <Box
      className={styles.sectionsWrapper}
      sx={{
        backgroundColor: "darkBg",
        gap: "1.5rem",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((sectionTitle, sectionIndex) => {
          return (
            <Box
              key={sectionTitle}
              ref={sectionRefs.current[sectionTitle]}
              sx={{
                marginBottom: isHidden(sectionTitle) ? "-2rem" : "0",
              }}
            >
              <SectionWithTitleFullPage
                title={
                  sectionTitle !== "ESS Schedule" &&
                  sectionTitle !== "Geo & Visitors" &&
                  sectionTitle !== "Sales & Generation"
                    ? sectionTitle
                    : ""
                }
                id={sectionTitle}
                multipleRows={sectionIndex > 0}
              >
                {!isHidden(sectionTitle) &&
                  sectionTitle === "Overview - all power plants" && (
                    <>
                      {renderDroppableRow(`row-1`, row1Order, {
                        display: "flex",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        gap: {
                          xs: 2,
                          xxl: "1.4rem",
                        },
                        width: "100%",
                      })}
                    </>
                  )}
                {!isHidden(sectionTitle) &&
                  sectionTitle === "Geo & Visitors" && (
                    <>
                      {renderDroppableRow(`row-2`, row2Order, {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        flexWrap: "nowrap",
                        gap: {
                          xs: 2,
                          xxl: "1.4rem",
                        },
                        width: "100%",
                      })}
                    </>
                  )}

                {!isHidden(sectionTitle) &&
                  sectionTitle === "Sales & Generation" && (
                    <>
                      {renderDroppableRow(`row-3`, row3Order, {
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "nowrap",
                        gap: {
                          xs: 2,
                          xxl: "1.4rem",
                        },
                        alignItems: "stretch",
                      })}
                    </>
                  )}
                {!isHidden(sectionTitle) && sectionTitle === "ESS Schedule" && (
                  <ESSSchedule />
                )}
              </SectionWithTitleFullPage>
            </Box>
          );
        })}
      </DragDropContext>
    </Box>
  );
};
