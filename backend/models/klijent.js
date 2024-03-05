const mongoose = require("mongoose");

const klijentSchema = new mongoose.Schema(
  {
    ime: String,
    adresa: String,
    OIB: {
      type: String,
      unique: true,
    },
    korisnik: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

klijentSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Klijent", klijentSchema, "Klijenti");
