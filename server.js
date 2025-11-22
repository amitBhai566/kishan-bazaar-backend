import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error", err));

// Sell Request Schema
const SellSchema = new mongoose.Schema({
  name: String,
  village: String,
  district: String,
  crop: String,
  qty: String,
  phone: String,
  time: { type: Date, default: Date.now }
});
const Sell = mongoose.model("Sell", SellSchema);

// API — test
app.get("/", (req, res) => {
  res.send("Kishan Bazaar Backend Running 🚜");
});

// API — Save Sell Request
app.post("/sell", async (req, res) => {
  try {
    const sellData = await Sell.create(req.body);
    return res.json({ success: true, msg: "Request Saved", data: sellData });
  } catch (error) {
    return res.json({ success: false, msg: "Error", error });
  }
});

// API — Get Sell Requests
app.get("/sell", async (req, res) => {
  const data = await Sell.find().sort({ time: -1 });
  res.json({ success: true, data });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Started at PORT", PORT));
