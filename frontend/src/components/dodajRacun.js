import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { customFetch } from "../api";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import useSWR from "swr";
import UnosStavki from "./unosStavki";

function DodajRacun() {
  const [broj, postaviBroj] = React.useState("");
  const [klijent, postaviKlijenta] = React.useState("");
  const [stavke, postaviStavke] = React.useState([
    { naziv: "", cijena: "", kolicina: "" },
  ]);
  const { data = [] } = useSWR("/api/klijenti");
  const enabled =
    stavke[0].naziv.length > 0 &&
    stavke[0].cijena.length > 0 &&
    stavke[0].kolicina.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    postaviBroj("");
    postaviKlijenta("");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        alignitems="center"
      >
        <Box style={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel>Klijent</InputLabel>
            <Select
              required
              value={klijent}
              onChange={(event) => {
                postaviKlijenta(event.target.value);
              }}
            >
              <MenuItem value="">
                <em>---</em>
              </MenuItem>
              {data.map((k) => (
                <MenuItem value={k.id}>{k.ime}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <InputLabel>Nove stavke:</InputLabel>
        <UnosStavki value={stavke} onChange={postaviStavke} />

        <Button
          style={{ width: "100%" }}
          variant="contained"
          type="submit"
          onClick={() =>
            NoviRacun({
              broj: broj,
              klijent: klijent,
              stavke: stavke,
            })
          }
          disabled={!(enabled && klijent)}
        >
          Dodaj Racun
        </Button>
      </Stack>
    </form>
  );
}

function NoviRacun(data) {
  customFetch("/api/racuni", {
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

export default DodajRacun;
