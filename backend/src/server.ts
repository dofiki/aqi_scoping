import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import './cron/agenda'
import express, { Application } from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes";
import aqiRoutes from "./routes/aqi.routes"

const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

async function start() {
  try {
    await connectDB();

    app.use("/auth", userRoutes);
    app.use("/aqi", aqiRoutes);

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
