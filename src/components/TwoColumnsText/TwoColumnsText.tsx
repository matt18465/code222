import { Box, Typography } from "@mui/material";

interface ColumnTextProps {
  content: {
    name: string;
    property: string;
  }[];
  widthColLeft?: string;
  widthColRight?: string;
}

export const TwoColumnsText = ({
  content,
  widthColLeft,
  widthColRight,
}: ColumnTextProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      {content.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              mb: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: {
                  xs: "0.8rem",
                  xl: "1rem",
                },
                whiteSpace: {
                  xs: "wrap",
                  md: "nowrap",
                },
                width: widthColLeft ?? "50%",
                textAlign: "left",
              }}
            >
              {item.name}
            </Typography>
            <Box
              sx={{
                width: widthColRight ?? "50%",
                fontSize: {
                  xs: "0.8rem",
                  xl: "1rem",
                },
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.property }} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
