const registerRouter = require("express").Router();
const Korisnik = require("../models/korisnik");
const bcrypt = require("bcrypt");
const jwtSimple = require("jwt-simple");

registerRouter.post("/", async (req, res) => {
  const sadrzaj = req.body;
  try {
    const postojeciKorisnik = await Korisnik.findOne({ email: sadrzaj.email });

    if (postojeciKorisnik)
      return res
        .status(400)
        .json({ message: "Korisnik s unesenim email-om već postoji!" });

    const hassLozinka = await bcrypt.hash(sadrzaj.lozinka, 10);

    const korisnik = new Korisnik({
      ime: sadrzaj.ime,
      email: sadrzaj.email,
      lozinka: hassLozinka,
    });

    const noviKorisnik = await korisnik.save();

    const token = jwtSimple.encode(
      { email: noviKorisnik.email },
      process.env.SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message || "Greška" });
  }
});

module.exports = registerRouter;
