const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, quantity: { type: Number, required: true } }],
    total_price: { type: Number, required: true },
    shippingAddress: [{ street: { type: String, required: true }, city: { type: String, required: true }, state: { type: String, required: true }, postal_code: { type: String, required: true }, country: { type: String, required: true } }],
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
