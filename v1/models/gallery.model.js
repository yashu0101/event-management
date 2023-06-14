const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const gallerySchema = new mongoose.Schema({
  galleryId: Number,
  name: String,
  category: String,
  images: [],
});

gallerySchema.plugin(AutoIncrement, { inc_field: "galleryId" });
module.exports = mongoose.model("Gallery", gallerySchema);
