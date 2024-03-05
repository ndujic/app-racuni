const klijentiRouter = require("express").Router();
const Klijent = require("../models/klijent");

klijentiRouter.get("/", async (req, res) => {
  try {
    const klijenti = await Klijent.find({ korisnik: req.user.id });
    res.json(klijenti);
  } catch (err) {
    res.status(400).json({ message: "Klijent ne postoji" });
  }
});

klijentiRouter.post("/", async (req, res) => {
  const sadrzaj = req.body;

  const klijent = new Klijent({
    ime: sadrzaj.ime,
    adresa: sadrzaj.adresa,
    OIB: sadrzaj.OIB,
    korisnik: req.user.id,
  });

  const noviKlijent = await klijent.save();
  res.json(noviKlijent);
});

klijentiRouter.delete("/:id", (req, res) => {
  Klijent.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

module.exports = klijentiRouter;
