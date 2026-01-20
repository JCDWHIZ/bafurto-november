import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
