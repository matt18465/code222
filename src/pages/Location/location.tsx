import React, { useEffect } from "react";
import { Box, Card, CardContent } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import styles from "./location.module.scss";
import { MOCK_CHART_WIDGETS } from "../../mocks/mocks";
import { CardIds, useLocationStore } from "../../store/locationStore";
import { useSectionScroll } from "../../hooks/useSectionScroll";
import { UpDownArrows } from "../../components/UpDownArrows/UpDownArrows";
import { useDnD } from "../../hooks/useDnd";
import { ChartWidget } from "../../components/ChartWidget/ChartWidget";
import { OverviewColumn1 } from "./components/OverviewColumn1";
import { OverviewColumn2 } from "./components/OverviewColumn2";
import { FrontGateColumn1 } from "./components/FrontGateColumn1";
import { FrontGateColumn2 } from "./components/FrontGateColumn2";
import { ESSSchedule } from "./components/ESSSchedule";
import { BMSConfiguration } from "./components/BMSConfiguration";
import { ESSParameters } from "./components/ESSParameters";
import { MAP_LOCATIONS } from "../../mocks/mocks";
import { useParams } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

const CARD_WIDTHS = {
  // Plant overview
  "location-row1-column1": {
    xs: "100%",
    xxl: "30%",
  },
  "location-row1-column2": {
    xs: "100%",
    xxl: "69%",
  },
  // PV row
  "location-row2-column1": {
    xs: "100%",
    xl: "33%",
  },
  "location-row2-column2": {
    xs: "100%",
    xl: "33%",
  },
  "location-row2-column3": {
    xs: "100%",
    xl: "33%",
  },
  // Wind row
  "location-row3-column1": {
    xs: "100%",
    xl: "33%",
  },
  "location-row3-column2": {
    xs: "100%",
    xl: "33%",
  },
  "location-row3-column3": {
    xs: "100%",
    xl: "33%",
  },
  // ESS row
  "location-row4-column1": {
    xs: "100%",
    xl: "33%",
  },
  "location-row4-column2": {
    xs: "100%",
    xl: "33%",
  },
  "location-row4-column3": {
    xs: "100%",
    xl: "33%",
  },
  // FrontGate
  "location-row5-column1": {
    xs: "100%",
    xxl: "40%",
  },
  "location-row5-column2": {
    xs: "100%",
    xxl: "59%",
  },
};

type CardID = keyof typeof CARD_WIDTHS;
type LocationProps = {
  imageURL?: string;
  kW?: number;
  kWp?: number;
  title?: string;
  PR?: number;
  id?: number | string;
};
export const Location = () => {
  let { locationId } = useParams();

  const {
    sections,
    moveUp,
    moveDown,
    setRow1Order,
    setRow2Order,
    setRow3Order,
    setRow4Order,
    setRow5Order,
    row1Order,
    row2Order,
    row3Order,
    row4Order,
    row5Order,
  } = useLocationStore();
  const { setSectionToScroll, sectionRefs } = useSectionScroll(sections);
  const matchedLocation = MAP_LOCATIONS?.find(
    (location) =>
      location.id.replace(" ", "").toLowerCase() === locationId?.toLowerCase()
  );
  if (!matchedLocation) {
    return <Box>Sorry! Wrong address</Box>;
  }
  const { imageURL, kW, kWp, title, PR, id } = matchedLocation;
  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);
  useEffect(() => {
    setCurrentLocation(id);
  }, []);
  const setRowOrders: Record<
    string,
    React.Dispatch<React.SetStateAction<CardIds[]>>
  > = {
    "row-1": setRow1Order,
    "row-2": setRow2Order,
    "row-3": setRow3Order,
    "row-4": setRow4Order,
    "row-5": setRow5Order,
  };

  const rowOrders = {
    "row-1": row1Order,
    "row-2": row2Order,
    "row-3": row3Order,
    "row-4": row4Order,
    "row-5": row5Order,
  };

  const RenderChartWidget = ({ index }: { index: number }) => {
    if (index >= MOCK_CHART_WIDGETS.length) return null;
    const widgetData = MOCK_CHART_WIDGETS[index];
    return (
      <Card
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
      case "location-row1-column1":
        return (
          <OverviewColumn1
            kW={kW}
            imageURL={imageURL}
            PR={PR}
            kWp={kWp}
            title={title}
          />
        );
      case "location-row1-column2":
        return <OverviewColumn2 />;
      case "location-row2-column1":
        return <RenderChartWidget index={0} />;
      case "location-row2-column2":
        return <RenderChartWidget index={1} />;
      case "location-row2-column3":
        return <RenderChartWidget index={2} />;
      case "location-row3-column1":
        return <RenderChartWidget index={0} />;
      case "location-row3-column2":
        return <RenderChartWidget index={1} />;
      case "location-row3-column3":
        return <RenderChartWidget index={2} />;
      case "location-row4-column1":
        return <RenderChartWidget index={0} />;
      case "location-row4-column2":
        return <RenderChartWidget index={1} />;
      case "location-row4-column3":
        return <RenderChartWidget index={2} />;
      case "location-row5-column1":
        return <FrontGateColumn1 />;
      case "location-row5-column2":
        return <FrontGateColumn2 />;
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
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((sectionTitle, sectionIndex) => (
          <div key={sectionTitle} ref={sectionRefs.current[sectionTitle]}>
            <SectionWithTitle
              title={sectionTitle}
              arrows={
                <UpDownArrows
                  moveUp={moveUp}
                  moveDown={moveDown}
                  setSectionToScroll={setSectionToScroll}
                  sectionTitle={sectionTitle}
                />
              }
            >
              {sectionTitle === "SCADA - PLANT OVERVIEW" && (
                <>
                  {renderDroppableRow(`row-1`, row1Order, {
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: {
                      xs: 2,
                      xxl: "0",
                    },

                    width: "100%",
                  })}
                </>
              )}
              {sectionTitle === "PV PERFORMANCE" && (
                <>
                  {renderDroppableRow(`row-2`, row2Order, {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    gap: "1rem",

                    width: "100%",
                  })}
                </>
              )}
              {sectionTitle === "WIND PERFORMANCE" && (
                <>
                  {renderDroppableRow(`row-3`, row3Order, {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    gap: "1rem",

                    width: "100%",
                  })}
                </>
              )}
              {sectionTitle === "ESS PERFORMANCE" && (
                <>
                  {renderDroppableRow(`row-4`, row4Order, {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    gap: "1rem",

                    width: "100%",
                  })}
                </>
              )}
              {sectionTitle === "Event log & FrontGate" && (
                <>
                  {renderDroppableRow(`row-5`, row5Order, {
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "0px",
                  })}
                </>
              )}
              {sectionTitle === "ESS Schedule" && <ESSSchedule />}
              {sectionTitle === "BMS Configuration" && <BMSConfiguration />}
              {sectionTitle === "ESS Parameters" && <ESSParameters />}
            </SectionWithTitle>
          </div>
        ))}
      </DragDropContext>
    </Box>
  );
};
