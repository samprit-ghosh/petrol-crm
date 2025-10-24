import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
