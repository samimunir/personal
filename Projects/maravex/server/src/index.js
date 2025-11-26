import express from "express";
import connectDB from "./lib/mongodb.js";

const app = express();

app.listen(8080, () => {
  connectDB().then(() => {
    console.log("server is live on http://localhost:8080");
  });
});
