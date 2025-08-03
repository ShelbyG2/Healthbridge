import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
    return conn;
  } catch (error) {
    console.log("failed to connect to DB", error);
    process.exit(1);
  }
};

export default connectDB;