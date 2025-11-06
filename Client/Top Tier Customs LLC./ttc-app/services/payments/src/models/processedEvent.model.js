import mongoose from "mongoose";

const schema = new mongoose.Schema({
  eventId: { type: String, unique: true, index: true },
  type: String,
  processedAt: { type: Date, default: Date.now },
});

export const ProcessedEvent = mongoose.model("stripe_processed_events", schema);
