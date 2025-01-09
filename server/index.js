import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routers/auth.js";


const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());
// Define Routes
app.use("/api/auth", authRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
