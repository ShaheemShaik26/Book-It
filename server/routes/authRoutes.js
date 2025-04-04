const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Signup: User already exists with email:", email);
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Signup: Hashed Password:", hashedPassword);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id,
            },
        };

        jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                console.error("JWT Error:", err);
                return res.status(500).json({ message: "Error generating token." });
            }
             res.status(201).json({
                message: "User registered successfully!",
                token: token,
                userId: newUser.id,
                username: newUser.username,
            });
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send("Server error");
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields." });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            console.log("Login: User not found with email:", email);
            return res
                .status(400)
                .json({ message: "Invalid Credentials. User not found." });
        }

        // **ADD THIS LOGGING:**
        console.log("Login: Hashed password retrieved from DB:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Login: Password Match:", isMatch);

        if (!isMatch) {
            console.log("Login: Invalid Password for email:", email);
            return res
                .status(400)
                .json({ message: "Invalid Credentials. Incorrect password." });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.jwtSecret,
            {
                expiresIn: "1h",
            },
            (err, token) => {
                if (err) throw err;
                 res.json({
                    message: "Login successful!",
                    token: token,
                    userId: user.id,
                    username: user.username,
                });
            }
        );
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;