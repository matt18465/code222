import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ChartsDownloadButton from "../ChartsDownloadButton/ChartsDownloadButton";

const colorScale = scaleLinear<string, string>()
  .domain([0, 155])
  .range(["#e6e9f4", "#89abff"]);

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
type CountryData = {
  name: string;
  price: number;
  volume: number;
  flagURL?: string;
};
type GeoChartProps = {
  setTooltipContent: (content: string) => void;
  dataUnits?: string;
  countriesData: CountryData[];
};
export const GeoChart = ({
  setTooltipContent,
  dataUnits,
  countriesData,
}: GeoChartProps) => {
  const [position, setPosition] = useState<{
    coordinates: [x: number, y: number];
    zoom: number;
  }>({ coordinates: [0, 0], zoom: 1 });
  const [columns, setColumns] = useState<any>("");
  const [datas, setDatas] = useState<any>([]);
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };
  const handleMoveEnd = (position: {
    coordinates: [x: number, y: number];
    zoom: number;
  }) => {
    setPosition(position);
  };
  const setCSVData = (series: CountryData[]) => {
    if (!series?.length) {
      return;
    }
    const transformedColumnsData = [
      {
        id: "price",
        displayName: `${"Price"} ${dataUnits ? `(${dataUnits})` : ""}`,
      },
      {
        id: "volume",
        displayName: `${"Volume"} ${dataUnits ? `(${dataUnits})` : ""}`,
      },
    ];

    transformedColumnsData.unshift({
      id: "name",
      displayName: "Country",
    });
    const transformedDatas: CountryData[] = [];
    series.forEach((s, i) => {
      transformedDatas[i] = {
        ...transformedDatas[i],
        name: s.name,
        price: s.price,
        volume: s.volume,
      };
    });

    setColumns(transformedColumnsData);
    setDatas(transformedDatas);
  };
  useEffect(() => {
    setCSVData(countriesData);
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        height: {
          xs: 1,
          xl: 1,
        },
        width: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: 380,
      }}
    >
      <ComposableMap
        projectionConfig={{ scale: 130 }}
        data-tooltip-id="my-tooltip"
        width={700}
        height={350}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          filterZoomEvent={(e: any) => {
            return e.type === "wheel" && e.ctrlKey === false ? false : true;
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name !== "Antarctica")
                .map((geo) => {
                  const d = countriesData.find(
                    (s) => s.name === geo.properties.name
                  );

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d["price"]) : "#e6e9f4"}
                      onMouseEnter={() => {
                        setTooltipContent(
                          `${geo.properties.name} ${d?.price || 0}$`
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                    />
                  );
                })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        <IconButton onClick={handleZoomIn}>
          <ZoomInIcon
            sx={{
              fontSize: "1.5rem",
            }}
          />
        </IconButton>
        <IconButton onClick={handleZoomOut}>
          <ZoomOutIcon
            sx={{
              fontSize: "1.5rem",
            }}
          />
        </IconButton>
      </Box>
      <ChartsDownloadButton datas={datas} columns={columns} />
    </Box>
  );
};
