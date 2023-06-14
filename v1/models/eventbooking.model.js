const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const eventbookingSchema = new mongoose.Schema({
  customer: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  event: { type: mongoose.SchemaTypes.ObjectId, ref: "Package" },
  name: String,
  mobile: String,
  email: String,
  address: String,
  bookingId: Number,
  bookingdate: Date,
  date: Date,
  totalperson: Number,
  menu: String,
  location: String,
  type: String,
  remark: String,
  createdAt: { type: Date, default: Date.now },
});

eventbookingSchema.plugin(AutoIncrement, { inc_field: "bookingId" });
module.exports = mongoose.model("Eventbooking", eventbookingSchema);
