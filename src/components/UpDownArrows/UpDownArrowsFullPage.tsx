import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import styles from "./UpDownArrows.modules.scss";
import { SectionTitles } from "../../models/sections";
import { Box } from "@mui/material";

interface UpDownArrowsProps {
  moveUp: (title: SectionTitles) => void;
  moveDown: (title: SectionTitles) => void;
  setSectionToScroll: React.Dispatch<React.SetStateAction<string | null>>;
  sectionTitle: SectionTitles;
  rowNumber: number;
}

export const UpDownArrowsFullPage = ({
  rowNumber,
  moveUp,
  moveDown,
  setSectionToScroll,
  sectionTitle,
}: UpDownArrowsProps) => {
  const handleMoveUp = () => {
    moveUp(sectionTitle);
    setSectionToScroll(null);
    setTimeout(() => setSectionToScroll(sectionTitle), 0);
  };

  const handleMoveDown = () => {
    moveDown(sectionTitle);
    setSectionToScroll(null);
    setTimeout(() => setSectionToScroll(sectionTitle), 0);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowUpwardIcon onClick={handleMoveUp} />
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowDownwardIcon onClick={handleMoveDown} />
      </Box>
    </Box>
  );
};
