const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

const customerSchema = new mongoose.Schema({
  crId: Number,
  name: String,
  date: Date,
  type: String,
  details: String,
  rating: String,
  images: [],
  createdAt: { type: Date, default: Date.now },
});

customerSchema.plugin(AutoIncrement, { inc_field: "crId" });
module.exports = mongoose.model("Customerreviews", customerSchema);
