const mongoose = require("mongoose");

const korisnikSchema = new mongoose.Schema(
  {
    ime: String,
    email: { type: String, unique: true },
    lozinka: String,
  },
  { timestamps: true }
);

korisnikSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Korisnik", korisnikSchema, "Korisnik");
