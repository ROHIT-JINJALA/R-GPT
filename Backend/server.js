import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  connectDB();
});

const connectDB = async () =>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ connected with database");
  } catch (error) {
    console.log("❌  Failed to connect with the database  ",error);
  }
}