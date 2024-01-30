import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { MOCK_PV_PLANT_OVERVIEW } from "../../../../mocks/mocks";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export default function PlantOverviewTable() {
  const generateOverview = () => {
    const tables = [];
    const plant = MOCK_PV_PLANT_OVERVIEW[0];
    for (const property in plant) {
      const { icon, title, color, unit, today, total, current } =
        plant[property as keyof typeof plant];
      tables.push(
        <TableContainer
          key={property}
          component={Paper}
          sx={{
            "& .MuiTableCell-root": {
              py: 1.7,
            },
          }}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ bgcolor: `${color}44` }}>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    width: 1,
                  }}
                >
                  {icon}
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: title!,
                    }}
                    sx={{
                      color: color,
                      fontWeight: 600,
                      pl: 1,
                      float: "left",
                    }}
                  ></Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {today && (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    TODAY
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600, color, fontSize: "1.1rem" }}
                  >
                    {
                      MOCK_PV_PLANT_OVERVIEW[0][property as keyof typeof plant]
                        .today
                    }
                    {unit}
                  </TableCell>
                </TableRow>
              )}
              {total && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    TOTAL
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600, color, fontSize: "1.1rem" }}
                  >
                    {
                      MOCK_PV_PLANT_OVERVIEW[0][property as keyof typeof plant]
                        .total
                    }
                    {unit}
                  </TableCell>
                </TableRow>
              )}
              {current && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    CURRENT
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600, color, fontSize: "1.1rem" }}
                  >
                    {
                      MOCK_PV_PLANT_OVERVIEW[0][property as keyof typeof plant]
                        .current
                    }
                    {unit}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    return tables;
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "auto",
        flexDirection: "column",
        gap: 1,
        width: {
          xs: 1,
          xl: "auto",
        },
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "12px",
          p: {
            xs: "0",
          },
          minWidth: {
            xs: "100%",
            lg: "305px",
          },
          height: 1,
          borderRadius: "8px",
          overflow: "hidden",
          padding: "0.5rem",
        }}
      >
        <CardContent sx={{ width: 1, p: 0, pb: "0!important" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              alignItems: "flex-start",
              padding: 0,
              width: 1,
              height: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant={"h6"}
              sx={{
                color: "text.primary",
                fontWeight: "600",

                p: 2,
              }}
            >
              PV PLANT
            </Typography>
            <Box
              sx={{
                p: 0,
                width: 1,
              }}
            >
              {...generateOverview()}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
