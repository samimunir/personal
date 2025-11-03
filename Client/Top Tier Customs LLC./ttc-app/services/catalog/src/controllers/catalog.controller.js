import Product from "../models/Product.js";
import Service from "../models/Service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { BadRequest, NotFound } from "../utils/httpErrors.js";

export const health = (_req, res) => res.json({ ok: true });

// browse — public
export const listProducts = asyncHandler(async (_req, res) => {
  const docs = await Product.find({ visible: true }).limit(100);
  res.json(docs);
});

export const getProduct = asyncHandler(async (req, res) => {
  const doc = await Product.findOne({ slug: req.params.slug });
  if (!doc) throw NotFound("product_not_found");
  res.json(doc);
});

export const listServices = asyncHandler(async (_req, res) => {
  const docs = await Service.find({ visible: true }).limit(100);
  res.json(docs);
});

export const getService = asyncHandler(async (req, res) => {
  const doc = await Service.findOne({ slug: req.params.slug });
  if (!doc) throw NotFound("service_not_found");
  res.json(doc);
});

// admin — (add auth/RBAC at gateway later)
export const createProduct = asyncHandler(async (req, res) => {
  if (!req.body.slug || !req.body.title || !req.body.price)
    throw BadRequest("slug, title, price required");
  const doc = await Product.create(req.body);
  res.json(doc);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doc) throw NotFound("product_not_found");
  res.json(doc);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const doc = await Product.findByIdAndDelete(req.params.id);
  if (!doc) throw NotFound("product_not_found");
  res.json(doc);
});

export const createService = asyncHandler(async (req, res) => {
  if (!req.body.slug || !req.body.title)
    throw BadRequest("slug, title required");
  const doc = await Service.create(req.body);
  res.json(doc);
});

export const updateService = asyncHandler(async (req, res) => {
  const doc = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doc) throw NotFound("service_not_found");
  res.json(doc);
});

export const deleteService = asyncHandler(async (req, res) => {
  const doc = await Service.findByIdAndDelete(req.params.id);
  if (!doc) throw NotFound("service_not_found");
  res.json(doc);
});
