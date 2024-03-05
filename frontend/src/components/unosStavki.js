import * as React from "react";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function UnosStavki(props) {
  const stavke = props.value;
  const postaviStavke = props.onChange;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddClick = () => {
    postaviStavke([...stavke, {}]);
  };

  const handleRemoveClick = (index) => {
    const lista = [...stavke];
    lista.splice(index, 1);
    postaviStavke(lista);
  };

  const promjeniNaziv = (index, naziv) => {
    let data = [...stavke];
    data[index].naziv = naziv;
    postaviStavke(data);
  };

  const promjeniCijenu = (index, cijena) => {
    let data = [...stavke];
    data[index].cijena = cijena;
    postaviStavke(data);
  };

  const promjeniKolicinu = (index, kolicina) => {
    let data = [...stavke];
    data[index].kolicina = kolicina;
    postaviStavke(data);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Stack direction="column" alignItems="center" spacing={2}>
        {stavke.map((item, index) => (
          <TableRow>
            <TextField
              required
              id="naziv"
              key={index}
              label="Naziv"
              value={item.naziv}
              onChange={(event) => promjeniNaziv(index, event.target.value)}
            />
            <TextField
              required
              id="cijena"
              key={index}
              label="Cijena"
              value={item.cijena}
              onChange={(event) => promjeniCijenu(index, event.target.value)}
            />
            <TextField
              required
              id="kolicina"
              key={index}
              label="Količina"
              value={item.kolicina}
              onChange={(event) => promjeniKolicinu(index, event.target.value)}
            />
            {index ? (
              <Button
                variant="contained"
                type="button"
                onClick={() => handleRemoveClick(index)}
              >
                Ukloni
              </Button>
            ) : null}
          </TableRow>
        ))}

        <Button
          style={{ width: "100%" }}
          variant="contained"
          type="button"
          onClick={handleAddClick}
        >
          Dodaj stavku
        </Button>
      </Stack>
    </form>
  );
}

export default UnosStavki;
