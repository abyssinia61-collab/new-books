const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected to Atlas"))
    .catch((err) => console.error("❌ DB Error:", err.message));

app.use("/api/books", require("./routes/books"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.get("/", (req, res) => res.send("Bookstore API is running 📚"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));