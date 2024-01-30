import { Box, Paper, Typography } from "@mui/material";

import { SectionWithTitle } from "../../components/SectionWithTitle/SectionWithTitle";
import styles from "./Documentation.module.scss";
import documentationScreen from "../../assets/images/documentation.png";
export const Documentation = () => {
  return (
    <div className={styles.sectionsWrapper}>
      <SectionWithTitle title="Documentation">
        <Box
          component="img"
          src={documentationScreen}
          alt="documentation"
          width="100%"
        />
      </SectionWithTitle>
    </div>
  );
};
