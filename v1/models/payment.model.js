const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const paymentSchema = new mongoose.Schema({
  paymentId: Number,
  paymentmode: String,
  customername: String,
  paidamount: Number,
  dob: Date,
  remark: String,
  createdAt: { type: Date, default: Date.now },
});

paymentSchema.plugin(AutoIncrement, { inc_field: "paymentId" });
module.exports = mongoose.model("Payment", paymentSchema);
