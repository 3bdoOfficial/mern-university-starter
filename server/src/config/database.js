import mongoose from "mongoose";

import { MONGODB_URI } from "./env.js";

const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const connection = await mongoose.connect(MONGODB_URI);

  console.log(`MongoDB connected: ${connection.connection.name}`);
};

export default connectDB;
