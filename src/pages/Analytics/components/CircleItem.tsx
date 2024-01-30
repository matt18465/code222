import { Box, Link, Typography } from "@mui/material";
import { useThemeContext } from "../../../state/theme-context";

type CircleItemProps = {
  title?: string;
  link?: string;
  disabled?: boolean;
};

const CircleItem = ({ title, link, disabled }: CircleItemProps) => {
  const { mode } = useThemeContext();

  return (
    <Link
      href={link}
      sx={{
        textDecoration: "none",
        transition: ".3s all",
        pointerEvents: disabled ? "none" : "initial",
        opacity: disabled ? 0.8 : "initial",
        "& :hover": {
          opacity: 0.8,
        },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "8.5rem",
          height: "8.5rem",
          border: `1px solid ${mode === "dark" ? "white" : "grey"}
          `,
          borderRadius: "50%",
          "@media (min-width: 600px)": {
            width: "11rem",
            height: "11rem",
          },
        }}
      >
        <Typography
          color={disabled ? "grey" : "green"}
          sx={{
            fontWeight: 600,
            textAlign: "center",
            fontSize: "1rem",
            lineHeight: "1.2",
            "@media (min-width: 600px)": {
              fontSize: "1.7rem",
            },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Link>
  );
};

export default CircleItem;
