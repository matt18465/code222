import { Box, Card, Typography } from "@mui/material";

import StarHalfIcon from "@mui/icons-material/StarHalf";
type OverviewColumn1Props = {
  imageURL: string;
  kW: number;
  kWp: number;
  title: string;
  PR: number;
};
export const OverviewColumn1 = ({
  imageURL,
  kW,
  kWp,
  title,
  PR,
}: OverviewColumn1Props) => (
  <Card
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      gap: "12px",
      pr: "12px",
      width: "100%",
      borderRadius: "8px",
      overflow: "hidden",
      alignItems: "center",
    }}
    id="home-row1-column1"
  >
    <img height={115} width={115} src={imageURL} alt={"thumb"} />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <StarHalfIcon sx={{ color: "#FFC107" }} />
        <Typography
          variant={"body1"}
          sx={{
            fontSize: {
              xs: ".7rem",
              xl: "1rem",
            },
          }}
        >
          {kW} kW
        </Typography>
        <Typography
          variant={"body1"}
          sx={{
            color: "#9E9E9E",
            fontSize: {
              xs: ".7rem",
              xl: "1rem",
            },
          }}
        >
          (55% kWp)
        </Typography>
      </Box>
      <Typography
        variant={"body1"}
        sx={{
          color: "text.secondary",
          fontSize: {
            xs: ".8rem",
            xl: "1rem",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={"body1"}
        sx={{
          color: "text.secondary",
          fontSize: {
            xs: ".8rem",
            xl: "1rem",
          },
        }}
      >
        <strong>{PR}%</strong> PR
      </Typography>
    </Box>
  </Card>
);
