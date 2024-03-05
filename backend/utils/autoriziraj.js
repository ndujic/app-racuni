var jwtSimple = require("jwt-simple");
const Korisnik = require("../models/korisnik");

const autoriziraj = (req, res, next) => {
  const authToken = req.header("Authorization").replace("Bearer ", "");
  const data = jwtSimple.decode(authToken, process.env.SECRET);

  Korisnik.find({ email: data.email }).then((korisnik) => {
    if (korisnik.length !== "") {
      req.user = korisnik;
      next();
    } else {
      res.status(401).send();
    }
  });
};

module.exports = autoriziraj;
