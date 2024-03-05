const racuniRouter = require("express").Router();
const Racun = require("../models/racun");

racuniRouter.get("/", async (req, res) => {
  const racuni = await Racun.find(req.params.id).populate("klijent");
  res.json(racuni);
});

racuniRouter.get("/:id", async (req, res, next) => {
  try {
    const racun = await Racun.findById(req.params.id).populate("klijent");

    res.json(racun);
  } catch (err) {
    res.status(400).json({ message: "Račun ne postoji" });
  }
});

racuniRouter.post("/", async (req, res) => {
  const sadrzaj = req.body;

  const racun = new Racun({
    broj: (await Racun.find({})).length + 1,
    klijent: sadrzaj.klijent,
    stavke: sadrzaj.stavke,
    korisnik: req.user.id,
  });

  const noviRacun = await racun.save();
  res.json(noviRacun);
});

module.exports = racuniRouter;
