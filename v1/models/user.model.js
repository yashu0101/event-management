const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    first: { type: String, minlength: 3, maxlength: 45 },
    last: { type: String, minlength: 3, maxlength: 100 },
  },
  mobile: { type: String, minlength: 10, maxlength: 15 },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: String,
  gender: { type: String, minlength: 1, maxlength: 15 },

  dob: Date,
  role: String,
  status: Number,
  avatar: String,
  idDoc: String,

  address: {
    street: String,
    city: String,
    country: String,
    pincode: String,
  },
  createdAt: { type: Date, default: Date.now },

  bookings: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Eventbooking",
    },
  ],

  // reviews: [
  //   {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: "Customerreviews",
  //   },
  // ],
  // bookings: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Booking" }],
});

userSchema.plugin(AutoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
