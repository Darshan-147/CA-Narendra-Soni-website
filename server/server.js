import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

connectDB();

const app = express();

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://ca-narendra-soni-website.vercel.app",
];

const getOrigin = (value) => {
  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/$/, "");
  }
};

const allowedOrigins = new Set(
  [
    ...DEFAULT_ALLOWED_ORIGINS,
    process.env.CLIENT_URL,
    process.env.CORS_ORIGINS,
  ]
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .map((origin) => getOrigin(origin.trim()))
    .filter(Boolean)
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(getOrigin(origin))) {
        callback(null, true);
        return;
      }

      console.warn(`CORS rejected origin: ${origin}`);
      callback(null, false);
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Narendra Soni CA website API is running." });
});

app.use("/api/contact", contactRoutes);
app.use("/api", postRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
