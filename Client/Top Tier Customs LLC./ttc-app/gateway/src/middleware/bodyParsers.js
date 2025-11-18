import express from "express";

const jsonParser = express.json();

const rawJSONParser = express.raw({ type: "application/json" });

export { jsonParser, rawJSONParser };
