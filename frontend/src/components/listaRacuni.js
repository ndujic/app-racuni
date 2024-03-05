import useSWR from "swr";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#e0f7fa",
    },
  },
});

const useStyles = makeStyles({
  header: {
    backgroundColor: theme.palette.primary.main,
    fontSize: "20px",
    color: theme.palette.secondary.main,
  },
  finalRow: {
    backgroundColor: theme.palette.secondary.main,
  },
});

function ListaRacuni() {
  const { data } = useSWR("/api/racuni");

  const classes = useStyles();

  function Suma(lista) {
    let suma = 0;
    lista.forEach((element) => {
      suma += Number(element.kolicina) * Number(element.cijena);
    });
    return suma;
  }

  if (!data) return <div>loading...</div>;
  return (
    <TableContainer component={Paper}>
      <div style={{ width: "100%" }}>
        <Table style={{ width: 800, margin: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>Broj</TableCell>
              <TableCell>Klijent</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Cijena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((racun) => (
              <TableRow key={racun.id}>
                <TableCell component="th" scope="row">
                  {racun.broj}
                </TableCell>
                <TableCell>{racun.klijent.ime}</TableCell>
                <TableCell>{racun.klijent.createdAt}</TableCell>
                <TableCell>{Suma(racun.stavke)}</TableCell>

                <Link to={`/racuni/${racun.id}`}>
                  <Button variant="contained" type="button">
                    Prikaži
                  </Button>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}

export default ListaRacuni;
