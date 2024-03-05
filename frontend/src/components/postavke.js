import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useSWR from "swr";
import Checkbox from "@mui/material/Checkbox";

import { OsvjeziPostavke } from "./osvjeziPostavke";

function Postavke() {
  const { data } = useSWR("/api/postavke");
  const [ime, postaviIme] = React.useState("");
  const [adresa, postaviAdresu] = React.useState("");
  const [OIB, postaviOIB] = React.useState("");
  const [IBAN, postaviIBAN] = React.useState("");
  const [PDV, postaviPDV] = React.useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    postaviIme("");
    postaviAdresu("");
    postaviOIB("");
    postaviIBAN("");
  };

  if (!data) return <div>loading...</div>;
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Stack direction="column" alignItems="center" spacing={2}>
        <TextField
          style={{ width: "100%" }}
          required
          id="ime"
          label="Ime"
          defaultValue={data.ime}
          onChange={(event) => {
            postaviIme(event.target.value);
          }}
        />
        <TextField
          style={{ width: "100%" }}
          required
          id="adresa"
          label="Adresa"
          defaultValue={data.adresa}
          onChange={(event) => {
            postaviAdresu(event.target.value);
          }}
        />
        <TextField
          style={{ width: "100%" }}
          required
          id="oib"
          label="OIB"
          defaultValue={data.OIB}
          onChange={(event) => {
            postaviOIB(event.target.value);
          }}
        />
        <TextField
          style={{ width: "100%" }}
          required
          id="iban"
          label="IBAN"
          defaultValue={data.IBAN}
          onChange={(event) => {
            postaviIBAN(event.target.value);
          }}
        />
        <br />
        <Checkbox
          style={{ width: "100%" }}
          defaultChecked={data.PDV}
          inputProps={{ "aria-label": "Checkbox demo" }}
          onChange={(event) => {
            postaviPDV(event.target.checked);
          }}
        />
        PDV obveznik
        <br />
        <br />
        <Button
          style={{ width: "100%" }}
          variant="contained"
          type="submit"
          onClick={() =>
            OsvjeziPostavke({
              ime: ime || data.ime,
              adresa: adresa || data.adresa,
              OIB: OIB || data.OIB,
              IBAN: IBAN || data.IBAN,
              PDV: PDV === undefined ? data.PDV : PDV,
            })
          }
        >
          Spremi
        </Button>
      </Stack>
    </form>
  );
}
export default Postavke;
