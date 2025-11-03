import mongoose from "mongoose";
import { mongoUri } from "./env";

const connect = async () => {
  if (!mongoUri) {
    throw new Error("MONGO_URI missing");
  }

  await mongoose.connect(mongoUri);
  console.log("Mongo connected -> api/auth");
};

export default connect;
