const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Klijent = require("../models/klijent");
const pomocni = require("./pomocni-test");
const api = supertest(app);

beforeEach(async () => {
  await Klijent.deleteMany({});
  let objektKlijent = new Klijent(pomocni.popisKlijenti[0]);
  await objektKlijent.save();
  objektKlijent = new Klijent(pomocni.popisKlijenti[1]);
  await objektKlijent.save();
  objektKlijent = new Klijent(pomocni.popisKlijenti[2]);
  await objektKlijent.save();
});

test("klijenti se vraćaju kao JSON", async () => {
  await api
    .get("/api/klijenti")
    .set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtvcmlzbmlrM0BnbWFpbC5jb20ifQ.tXkt3QaDTG23OW64h58fUZBGp7hO3X-M4Wtfz4RDWgQ"
    )
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("imamo tri klijenta", async () => {
  const odgovor = await api
    .get("/api/klijenti")
    .set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtvcmlzbmlrM0BnbWFpbC5jb20ifQ.tXkt3QaDTG23OW64h58fUZBGp7hO3X-M4Wtfz4RDWgQ"
    );
  expect(odgovor.body).toHaveLength(3);
});

test("dohvaceno ime klijenta", async () => {
  const odgovor = await api
    .get("/api/klijenti")
    .set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtvcmlzbmlrM0BnbWFpbC5jb20ifQ.tXkt3QaDTG23OW64h58fUZBGp7hO3X-M4Wtfz4RDWgQ"
    );

  const sadrzaj = odgovor.body.map((k) => k.ime);
  expect(sadrzaj).toContain("HahaBusiness");
});

test("ispravno dodavanje novog klijenta", async () => {
  const noviKlijent = {
    id: "4506a6f781987259f2342340",
    ime: "KlijentIzTesta",
    adresa: "Vukovarska 24",
    OIB: "7563528",
  };
  await api
    .post("/api/klijenti")
    .set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtvcmlzbmlrM0BnbWFpbC5jb20ifQ.tXkt3QaDTG23OW64h58fUZBGp7hO3X-M4Wtfz4RDWgQ"
    )
    .send(noviKlijent)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const klijentNaKraju = await pomocni.klijentiUBazi();
  expect(klijentNaKraju).toHaveLength(pomocni.popisKlijenti.length + 1);

  const sadrzaj = klijentNaKraju.map((p) => p.ime);
  expect(sadrzaj).toContain("KlijentIzTesta");
});

test("ispravno brisanje klijenta", async () => {
  const klijentiPocetak = await pomocni.klijentiUBazi();
  const klijentiZaBrisanje = klijentiPocetak[0];

  const odgovor = await api
    .delete(`/api/klijenti/${klijentiZaBrisanje.id}`)
    .set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtvcmlzbmlrM0BnbWFpbC5jb20ifQ.tXkt3QaDTG23OW64h58fUZBGp7hO3X-M4Wtfz4RDWgQ"
    )
    .expect(204);

  const klijentiKraj = await pomocni.klijentiUBazi();
  expect(klijentiKraj).toHaveLength(klijentiPocetak.length - 1);

  const sadrzaj = klijentiKraj.map((k) => k.ime);
  expect(sadrzaj).not.toContain(klijentiZaBrisanje.ime);
});

afterAll(() => {
  mongoose.connection.close();
});
