import useSWR from "swr";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Button } from "@mui/material";
import { obrisiKlijenta } from "./obrisiKlijenta";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
});

const useStyles = makeStyles({
  header: {
    backgroundColor: theme.palette.primary.main,
  },
});

function ListaKlijenti() {
  const { data } = useSWR("/api/klijenti");

  const classes = useStyles();

  if (!data) return <div>loading...</div>;

  return (
    <TableContainer component={Paper}>
      <div style={{ width: "100%" }}>
        <Table style={{ width: 800, margin: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>Ime</TableCell>
              <TableCell>Adresa</TableCell>
              <TableCell>OIB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((klijent) => (
              <TableRow key={klijent.id}>
                <TableCell component="th" scope="row">
                  {klijent.ime}
                </TableCell>
                <TableCell>{klijent.adresa}</TableCell>
                <TableCell>{klijent.OIB}</TableCell>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => {
                    obrisiKlijenta(klijent.id);
                  }}
                >
                  Obriši
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}

export default ListaKlijenti;
