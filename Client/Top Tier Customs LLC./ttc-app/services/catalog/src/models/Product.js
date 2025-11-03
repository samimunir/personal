import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true, index: true },
    title: { type: String, required: true },
    description: String,
    images: [String],
    price: { type: Number, required: true },
    sku: String,
    variants: [
      { sku: String, attrs: Object, priceDelta: Number, stock: Number },
    ],
    visible: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);
export default Product;
