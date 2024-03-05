const postavkeRouter = require("express").Router();
const Postavke = require("../models/postavke");

postavkeRouter.get("/", async (req, res) => {
  const postavke = await Postavke.find({ korisnik: req.user.id });
  if (postavke.length === 0) {
    const p = new Postavke({
      ime: "",
      adresa: "",
      OIB: "",
      IBAN: "",
      PDV: false,
      korisnik: req.user.id,
    });
    const novePostavke = await p.save();
    res.json(novePostavke);
  } else {
    res.json(postavke[0]);
  }
});

postavkeRouter.put("/", (req, res, next) => {
  const sadrzaj = req.body;
  const id = req.params.id;

  const postavke = {
    ime: sadrzaj.ime,
    adresa: sadrzaj.adresa,
    OIB: sadrzaj.OIB,
    PDV: sadrzaj.PDV,
    IBAN: sadrzaj.IBAN,
    korisnik: req.user.id,
  };
  Postavke.findOneAndUpdate({ korisnik: req.user.id }, postavke, { new: true })
    .then((novePostavke) => {
      res.json(novePostavke);
    })
    .catch((err) => next(err));
});

module.exports = postavkeRouter;
