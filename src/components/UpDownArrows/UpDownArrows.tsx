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
}

export const UpDownArrows = ({
  moveUp,
  moveDown,
  setSectionToScroll,
  sectionTitle,
}: UpDownArrowsProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ArrowUpwardIcon
        onClick={() => {
          moveUp(sectionTitle);
          setSectionToScroll(null);
          setTimeout(() => setSectionToScroll(sectionTitle), 0);
        }}
      />
      <ArrowDownwardIcon
        onClick={() => {
          moveDown(sectionTitle);
          setSectionToScroll(null);
          setTimeout(() => setSectionToScroll(sectionTitle), 0);
        }}
      />
    </Box>
  );
};
