import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoUri");

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;

