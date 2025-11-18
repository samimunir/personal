import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true, index: true },
    title: { type: String, required: true },
    description: String,
    images: [String],
    durationMinutes: Number,
    basePrice: Number,
    requiresDeposit: Boolean,
    depositAmount: Number,
    visible: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

const Service = mongoose.model("services", serviceSchema);
export default Service;
