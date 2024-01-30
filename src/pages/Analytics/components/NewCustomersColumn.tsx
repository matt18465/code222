import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { MOCK_CUSTOMERS } from "../../../mocks/mocks";
import CustomerItem from "../../../components/Customers/CustomerItem";

type Props = {};

const NewCustomersColumn = (props: Props) => {
  return (
    <Card
      sx={{
        width: {
          xs: 1,
          xl: "28%",
        },
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        p: "12px",

        borderRadius: "8px",

        height: "auto",
      }}
      id="home-row3-column2"
    >
      <CardContent
        sx={{
          position: "relative",
          "& .download-btn": {
            position: "absolute",
            bottom: "1.2rem",
            right: "1.2rem",
          },
        }}
      >
        <Typography
          variant={"h6"}
          sx={{
            color: "text.primary",
            fontWeight: "600",
            mb: {
              xs: 3,
              xl: 6,
            },
            fontSize: {
              xs: "1rem",
              xl: "initial",
            },
          }}
        >
          New Customers
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: {
              xs: 3,
              xl: 4,
            },
          }}
        >
          {MOCK_CUSTOMERS.slice(0, 4).map((customer) => {
            const { id, firstName, lastName, email, avatarURL } = customer;
            return (
              <CustomerItem
                key={id}
                id={id}
                email={email}
                firstName={firstName}
                lastName={lastName}
                avatarURL={avatarURL}
              />
            );
          })}
        </Box>
        <Divider
          sx={{
            mt: {
              xs: 4,
              xl: 6,
            },
            mb: 3,
          }}
        />
        <Link
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            textDecoration: "none",
            fontWeight: 500,
            transition: ".3s all",
            "&:hover": {
              opacity: 0.8,
              gap: 1,
            },
            fontSize: {
              xs: ".8rem",
              xl: "initial",
            },
          }}
        >
          More insights <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />{" "}
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewCustomersColumn;
