const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { mongoURL } = require("./config");

const app = express();

// ✅ FIXED CORS: Allow Vercel Frontend
app.use(cors({
  origin: "https://tour-phi-neon.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api", routes);

// Render uses dynamic ports → FIX HERE
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Running on PORT", PORT));
