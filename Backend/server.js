
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const cors = require("cors");



const app = express();






// Middleware

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);




// Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("<h1>Instagram Clone API Running</h1>");  
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});