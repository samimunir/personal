import express from "express";
import cors from "cors";
import pino from "pino-http";
import mongoose from "mongoose";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(pino());

mongoose.connect(process.env.MONGO_URI!);

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    description: String,
    images: [String],
    price: Number,
    sku: String,
    variants: [
      { sku: String, attrs: Object, priceDelta: Number, stock: Number },
    ],
    visible: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
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

const Product = mongoose.model("products", productSchema);
const Service = mongoose.model("services", serviceSchema);

app.get("/products", async (_req, res) =>
  res.json(await Product.find({ visible: true }).limit(100))
);

app.get("/products/:slug", async (req, res) =>
  res.json(await Product.findOne({ slug: req.params.slug }))
);

app.get("/services", async (_req, res) =>
  res.json(await Service.find({ visible: true }).limit(100))
);

app.get("/services/:slug", async (req, res) =>
  res.json(await Service.findOne({ slug: req.params.slug }))
);

app.post("/admin/products", async (req, res) =>
  res.json(await Product.create(req.body))
);

app.patch("/admin/products/:id", async (req, res) =>
  res.json(
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  )
);

app.delete("/admin/products/:id", async (req, res) =>
  res.json(await Product.findByIdAndDelete(req.params.id))
);

app.post("/admin/services", async (req, res) =>
  res.json(await Service.create(req.body))
);

app.patch("/admin/services/:id", async (req, res) =>
  res.json(
    await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
  )
);

app.delete("/admin/services/:id", async (req, res) =>
  res.json(await Service.findByIdAndDelete(req.params.id))
);

app.listen(process.env.PORT || 5002, () =>
  console.log(`catalog live on localhost:5002`)
);
