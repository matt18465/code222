import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Card, CardContent, Pagination, Typography } from "@mui/material";
import { MOCK_ANALYTICS_TRAFFIC_DATA } from "../../../mocks/mocks";
import { dark } from "@mui/material/styles/createPalette";
import { useThemeContext } from "../../../state/theme-context";

interface Column {
  id: "channels" | "sessions" | "bounce_rate" | "traffic" | "sales";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "channels", label: "CHANNELS", minWidth: 100 },
  {
    id: "sessions",
    label: "SESSIONS",
    minWidth: 100,

    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "bounce_rate",
    label: "BOUNCE RATE",
    minWidth: 100,
    align: "left",
    format: (value: number) => `${value.toLocaleString("en-US")}%`,
  },
  {
    id: "traffic",
    label: "TRAFFIC",
    minWidth: 100,
    align: "left",
    format: (value: number) => `${value.toLocaleString("en-US")}%`,
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 100,
    align: "left",
  },
];

interface Data {
  channels: string;
  sessions: number;
  bounce_rate: number;
  traffic: number;
  sales: number;
}

function createData(
  channels: string,
  sessions: number,
  bounce_rate: number,
  traffic: number,
  sales: number
): Data {
  return { channels, sessions, bounce_rate, traffic, sales };
}

const rows = MOCK_ANALYTICS_TRAFFIC_DATA.map((data) => {
  const { channels, sessions, bounce_rate, traffic, sales } = data;
  return createData(channels, sessions, bounce_rate, traffic, sales);
});

export default function AnalyticsTraffic() {
  const { mode } = useThemeContext();

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        pr: "12px",

        borderRadius: "8px",
        p: "12px",
        flex: 1,
      }}
    >
      <CardContent>
        <Typography
          variant={"h6"}
          sx={{
            color: "text.primary",
            fontWeight: "600",
            mb: 3,
            fontSize: {
              xs: "1rem",
              xl: "initial",
            },
          }}
        >
          Analytics Traffic Channels & Goal
        </Typography>
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            zIndex: 0,
          }}
        >
          <TableContainer
            sx={{
              maxHeight: 440,
              "&::-webkit-scrollbar": {
                width: "0.3rem",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{}}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        bgcolor: mode === "dark" ? "auto" : "#e7e8ef",
                        borderBottom: "none",
                        padding: {
                          xs: 1,
                          lg: 2,
                        },
                        fontSize: {
                          xs: ".7rem",
                          xl: ".875rem",
                        },
                      }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{
                                borderBottom: "none",
                                fontSize: {
                                  xs: ".7rem",
                                  xl: ".875rem",
                                },
                                padding: {
                                  xs: 1,
                                  lg: 2,
                                },
                              }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            shape="rounded"
            onChange={handleChangePage}
            color={"primary"}
            sx={{
              py: 2,
              "& .MuiPagination-ul": {
                justifyContent: {
                  xs: "center",
                  xl: "flex-start",
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
