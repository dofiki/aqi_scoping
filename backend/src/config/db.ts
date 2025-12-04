import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.DB_CONN_STRING) throw new Error("DB_CONN_STRING not defined");
    
    const conn = await mongoose.connect(process.env.DB_CONN_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

export default connectDB;
