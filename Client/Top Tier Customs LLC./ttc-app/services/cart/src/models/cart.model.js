import mongoose from "mongoose";
const itemSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true },
    title: String,
    qty: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true }, // cents
    variant: Object,
    image: String,
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true, unique: true },
    currency: { type: String, default: "usd" },
    items: { type: [itemSchema], default: [] },
    subtotal: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.methods.recalc = function () {
  this.subtotal = this.items.reduce((t, i) => t + i.qty * i.unitPrice, 0);
};

export const Cart = mongoose.model("carts", cartSchema);
