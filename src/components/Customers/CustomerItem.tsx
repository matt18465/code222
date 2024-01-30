import React from "react";
import { Customer } from "../../models/customer";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  deepOrange,
  deepPurple,
  purple,
  pink,
  green,
  lightBlue,
} from "@mui/material/colors";

type CustomerProps = Customer;

const CustomerItem = ({
  id,
  firstName,
  lastName,
  email,
  avatarURL,
}: CustomerProps) => {
  const colors = [deepOrange, deepPurple, purple, pink, green, lightBlue];
  const randomColor = Math.floor(Math.random() * colors.length);

  const initials = `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Avatar
        src={avatarURL ?? ""}
        sx={{
          height: {
            xs: 36,
            xl: 46,
          },
          width: {
            xs: 36,
            xl: 46,
          },
          mr: "6px",
          bgcolor: colors[randomColor][500],
          fontSize: {
            xs: ".8rem",
            xl: "1rem",
          },
        }}
      >
        {!avatarURL ? initials : ""}
      </Avatar>
      <Box
        sx={{
          px: 1,
        }}
      >
        <Typography
          variant={"body1"}
          sx={{
            fontWeight: "600",
            fontSize: {
              xs: ".8rem",
              xl: ".9rem",
            },
          }}
        >
          {firstName} {lastName}
        </Typography>
        <Typography
          variant={"body2"}
          sx={{
            fontSize: {
              xs: ".7rem",
              xl: ".8rem",
            },
          }}
        >
          Customer ID#{id}
        </Typography>
      </Box>
      <Box
        sx={{
          justifySelf: "flex-end",
          marginLeft: "auto",
        }}
      >
        <IconButton href={`mailto:${email}`}>
          <MailOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomerItem;
