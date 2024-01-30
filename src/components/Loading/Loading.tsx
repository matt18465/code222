import { Box, CircularProgress } from "@mui/material";

export const Loading = () => (
  <Box
    sx={{
      height: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress size={60} />
  </Box>
);
