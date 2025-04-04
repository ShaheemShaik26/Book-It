const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.post("/login", async (req, res) => {
    console.log("🔹 Login request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Missing email or password" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password for:", email);
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });

        console.log("Login successful for:", user.email);
        res.json({
            message: "Login successful",
            token,
            userId: user._id,
            username: user.username
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;