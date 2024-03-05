const loginRouter = require("express").Router();
const Korisnik = require("../models/korisnik");
const bcrypt = require("bcrypt");
const jwtSimple = require("jwt-simple");

loginRouter.post("/", async (req, res) => {
  const sadrzaj = req.body;
  try {
    const postojeciKorisnik = await Korisnik.findOne({ email: sadrzaj.email });

    if (!postojeciKorisnik) {
      res.status(400).json({ message: "Korisnik ne postoji!" });
      return;
    }

    const lozinkaOk = await bcrypt.compare(
      sadrzaj.lozinka,
      postojeciKorisnik.lozinka
    );

    if (!lozinkaOk) {
      res.status(400).json({ message: "Neispravna lozinka!" });
      return;
    }

    const token = jwtSimple.encode(
      { email: postojeciKorisnik.email },
      process.env.SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = loginRouter;
