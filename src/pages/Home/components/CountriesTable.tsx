import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@mui/material";
type CountryData = {
  name: string;
  price: number;
  volume: number;
  flagURL?: string;
};

function createData(
  name: string,
  price: number,
  volume: number,
  flagURL?: string
) {
  return { name, price, volume, flagURL };
}

type CountriesTableProps = {
  countriesData: CountryData[];
};
const CountriesTable = ({ countriesData }: CountriesTableProps) => {
  const rows = countriesData.map((country) =>
    createData(country.name, country.price, country.volume, country.flagURL)
  );
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none", background: "none" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Icon>
                  <img
                    style={{ height: 25, borderRadius: "50%" }}
                    src={row.flagURL}
                  />
                </Icon>
                {row.name}
              </TableCell>
              <TableCell align="right">${row.price}</TableCell>
              <TableCell align="right">{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CountriesTable;
