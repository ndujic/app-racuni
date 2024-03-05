const Klijent = require("../models/klijent");

const popisKlijenti = [
  {
    id: "6303a6f981982258f2942843",
    ime: "HahaBusiness",
    adresa: "Šibenska 14",
    OIB: "3456789",
  },
  {
    id: "62ea70159e6ac3ff3a7187a1",
    ime: "aaaa",
    adresa: "dddd",
    OIB: "2222",
  },
  {
    id: "630164d3716ddd68fe1e3916",
    ime: "probniKlijent",
    adresa: "aaa",
    OIB: "76543",
  },
];

const klijentiUBazi = async () => {
  const klijenti = await Klijent.find({});
  return klijenti.map((k) => k.toJSON());
};

module.exports = {
  popisKlijenti,
  klijentiUBazi,
};
