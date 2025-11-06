import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    sku: { type: String, unique: true, index: true },
    stock: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export const Stock = mongoose.model("inventory_stock", stockSchema);
