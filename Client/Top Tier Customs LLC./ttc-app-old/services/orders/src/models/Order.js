import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    sku: String,
    title: String,
    qty: Number,
    unitPrice: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: String, // string from JWT (optional for now)
    items: [itemSchema], // denormalized
    amount: Number, // total in cents
    currency: { type: String, default: "usd" },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "paid",
    },
    paymentIntentId: { type: String, index: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

export default Order;
