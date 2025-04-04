const express = require("express");
const Book = require("../models/Book");
const router = express.Router();


router.post("/add", async (req, res) => {
    try {
        const { title, author, description, imageUrl, rating, available, userId } = req.body;
        const newBook = new Book({ title, author, description, imageUrl, rating, available, userId });
        await newBook.save();

        res.status(201).json({ message: "Book added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/:userId", async (req, res) => {
    try {
        const books = await Book.find({ userId: req.params.userId });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
