import "./prikazRacuna.css";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import TableBody from "@mui/material/TableBody";
import { TableHead } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

function Suma(lista) {
  let suma = 0;
  lista.forEach((element) => {
    suma += Number(element.kolicina) * Number(element.cijena);
  });
  return suma;
}

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

    color: theme.palette.secondary.main,
  },
  finalRow: {
    backgroundColor: theme.palette.secondary.main,
    align: "right",
  },
});

function useDataRacuni() {
  const params = useParams();
  const { data } = useSWR("/api/racuni/" + params.id);
  return data;
}

function useDataPostavke() {
  const { data } = useSWR("/api/postavke");
  return data;
}

function PrikazRacuna() {
  const racuni = useDataRacuni();
  const postavke = useDataPostavke();

  const classes = useStyles();

  if (!racuni) return <div>loading...</div>;
  if (!postavke) return <div>loading...</div>;

  const iznosRacuna = Suma(racuni.stavke);

  let datumIsporuke = new Date(racuni.createdAt);
  let rokPlacanja = new Date(racuni.createdAt);
  rokPlacanja.setMonth(rokPlacanja.getMonth() + 1);

  let PDV = postavke.PDV;

  return (
    <div className="section-to-print" style={{ width: 1000, margin: "auto" }}>
      <div className="header" align="right">
        <b>{postavke.ime}</b>
        <br />
        {postavke.adresa}
        <br />
        <b>OIB: </b>
        {postavke.OIB}
        <br />
        <b>IBAN: </b>
        {postavke.IBAN}
        <br />
      </div>
      <div>
        <Divider />
        <br />

        <div className="rightChild" align="right">
          <b>R1 račun broj: {racuni.broj}</b>
          <br />
          <b>Datum kreiranja: </b>
          {datumIsporuke.toLocaleDateString()}
          <br />
          <b>Datum isporuke: </b>
          {datumIsporuke.toLocaleDateString()}
          <br />
          <b>Rok plaćanja: </b>
          {rokPlacanja.toLocaleDateString()}
        </div>
        <div className="leftChild">
          <b>Za: </b> <br />
          {racuni.klijent.ime}
          <br />
          {racuni.klijent.adresa}
          <br />
          OIB: {racuni.klijent.OIB}
          <br />
          <br />
        </div>
      </div>
      <div>
        <Table
          style={{ width: 1000, margin: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>Stavke</TableCell>
              <TableCell>Količina</TableCell>
              <TableCell>Cijena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {racuni.stavke.map((k, i) => (
              <TableRow key={i}>
                <TableCell>{k.naziv}</TableCell>
                <TableCell>{k.kolicina}</TableCell>
                <TableCell>{k.cijena} kn</TableCell>
              </TableRow>
            ))}
            <TableRow className={classes.finalRow}>
              <TableCell colSpan={4} align="right">
                <b>Iznos: </b>
                {iznosRacuna} kn
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
      </div>

      <div className="footer" align="right">
        <b>Osnovica: </b> {iznosRacuna} kn
        <br />
        <b>PDV(25%): </b> {PDV === true ? iznosRacuna * 0.25 : 0} kn
        <br />
        <b>Ukupan iznos: </b>{" "}
        {PDV === true ? iznosRacuna + iznosRacuna * 0.25 : iznosRacuna} kn
        <br />
      </div>
    </div>
  );
}

export default PrikazRacuna;
