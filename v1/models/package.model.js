const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const packageSchema = new mongoose.Schema({
  eventId: Number,
  date: String,
  name: String,
  type: String,
  price: Number,
  size: Number,
  facilities: String,
  description: String,
  images: [],
  bookings: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Eventbooking",
    },
  ],
});

packageSchema.plugin(AutoIncrement, { inc_field: "eventId" });
// module.exports("Package", packageSchema);
module.exports = mongoose.model("Package", packageSchema);
