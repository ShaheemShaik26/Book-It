const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authroutes"); 
const profileRoutes = require("./routes/profileRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

const corsOptions = {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/books", bookRoutes);

app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookitDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});