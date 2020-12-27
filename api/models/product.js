const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, require: true },
});

module.exports = mongoose.model("Product", productSchema);
