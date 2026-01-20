import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    // add MONGO_URL=mongodb+srv://username:password@cluster0.6edau4r.mongodb.net/databaseName?appName=Cluster0
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
