import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { customFetch } from "../api";

function DodajKlijenta() {
  const [ime, postaviIme] = React.useState("");
  const [adresa, postaviAdresu] = React.useState("");
  const [OIB, postaviOIB] = React.useState("");
  const enabled = ime.length > 0 && adresa.length > 0 && OIB.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    postaviIme("");
    postaviAdresu("");
    postaviOIB("");
  };
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        alignitems="center"
      >
        <TextField
          style={{ width: "100%" }}
          required
          id="ime"
          label="Ime"
          value={ime}
          onChange={(event) => {
            postaviIme(event.target.value);
          }}
        />
        <TextField
          style={{ width: "100%" }}
          required
          id="adresa"
          label="Adresa"
          value={adresa}
          onChange={(event) => {
            postaviAdresu(event.target.value);
          }}
        />
        <TextField
          style={{ width: "100%" }}
          required
          id="oib"
          label="OIB"
          value={OIB}
          onChange={(event) => {
            postaviOIB(event.target.value);
          }}
        />
        <Button
          style={{ width: "100%" }}
          variant="contained"
          type="submit"
          onClick={() =>
            NoviKlijent({
              ime: ime,
              adresa: adresa,
              OIB: OIB,
            })
          }
          disabled={!enabled}
        >
          Dodaj klijenta
        </Button>
      </Stack>
    </form>
  );
}

function NoviKlijent(data) {
  customFetch("/api/klijenti", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default DodajKlijenta;
