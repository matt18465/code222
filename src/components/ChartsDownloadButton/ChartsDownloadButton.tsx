import CsvDownloader from "react-csv-downloader";
import DownloadIcon from "@mui/icons-material/Download";
import { SxProps } from "@mui/material";
import React from "react";
type ChartsDownloadButtonProps = {
  columns: any[];
  datas: any[];
  styles?: React.CSSProperties;
};

const ChartsDownloadButton = ({
  columns,
  datas,
  styles,
}: ChartsDownloadButtonProps) => {
  const isDataEmpty = () => {
    let empty = true;
    datas.forEach((d) => {
      for (let prop in d) {
        const isIterator = prop === "timestamp" || prop === "index";
        if (!isIterator) {
          if (d[prop] != 0) {
            empty = false;
          }
        }
      }
    });
    return empty;
  };
  const isChartEmpty = isDataEmpty();

  return (
    <CsvDownloader
      className="download-btn"
      filename={new Date().toLocaleDateString()}
      extension=".csv"
      separator=";"
      columns={columns ?? []}
      datas={datas ?? []}
      disabled={isChartEmpty}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        justifySelf: "flex-end",
        paddingRight: ".5rem",
        alignSelf: "flex-end",
        paddingTop: ".5rem",
        ...styles,
      }}
    >
      <DownloadIcon
        sx={{
          opacity: ".8",
          transition: ".3s all",
          "&:hover": {
            opacity: "1",
            cursor: `${isChartEmpty ? "not-allowed" : "pointer"}`,
          },
        }}
        color={isChartEmpty ? "disabled" : "inherit"}
      />
    </CsvDownloader>
  );
};

export default ChartsDownloadButton;
