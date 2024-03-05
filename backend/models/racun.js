const mongoose = require("mongoose");

const racunSchema = new mongoose.Schema(
  {
    broj: String,
    klijent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Klijent",
    },
    stavke: [{ naziv: String, cijena: String, kolicina: String }],
    korisnik: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

racunSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Racun", racunSchema, "Racun");
