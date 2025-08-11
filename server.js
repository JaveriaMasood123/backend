const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS setup to allow Vite frontend
app.use(cors({
  origin: "*", // Change to your frontend URL in production
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/profile", require("./routes/profile.routes"));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
