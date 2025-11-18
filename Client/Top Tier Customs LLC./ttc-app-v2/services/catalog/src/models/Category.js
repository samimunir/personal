import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;
