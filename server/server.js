import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Narendra Soni CA website API is running." });
});

app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
