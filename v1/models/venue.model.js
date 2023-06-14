const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const venueSchema = new mongoose.Schema({
  venueId: Number,
  capacity: Number,
  location: String,
  type: String,
  dob: Date,
  cost: Number,
  discription: String,
  createdAt: { type: Date, default: Date.now },
});

venueSchema.plugin(AutoIncrement, { inc_field: "venueId" });
module.exports = mongoose.model("Venue", venueSchema);
