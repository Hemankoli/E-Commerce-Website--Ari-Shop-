const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    brandName: { type: String },
    description: { type: String },
    image: [{ type: String }],
    price: { type: Number, required: true },
    selling: { type: Number },
    category: { type: String },
    quantity: { type: Number },
    showcase: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
