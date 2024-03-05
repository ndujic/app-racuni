const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const klijentiRouter = require("./controllers/klijenti");
const racuniRouter = require("./controllers/racuni");
const postavkeRouter = require("./controllers/postavke");
const registerRouter = require("./controllers/korisniciRegistracija");
const loginRouter = require("./controllers/korisniciPrijava");
const autoriziraj = require("./utils/autoriziraj");

logger.info("Spajam se na", config.DB_URI);

mongoose
  .connect(config.DB_URI)
  .then((result) => {
    logger.info("Spojeni smo na bazu");
  })
  .catch((error) => {
    logger.greska("Greška pri spajanju", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/klijenti", autoriziraj, klijentiRouter);
app.use("/api/racuni", autoriziraj, racuniRouter);
app.use("/api/postavke", autoriziraj, postavkeRouter);
app.use("/registracija", registerRouter);
app.use("/prijava", loginRouter);
app.use(middleware.zahtjevInfo);
app.use(middleware.nepoznataRuta);
app.use(middleware.errorHandler);

module.exports = app;
