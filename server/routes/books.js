const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Book = require("../models/Book");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "ethiobooks_secret_key_123";

// ⚠️ Same admin email
const ADMIN_EMAIL = "abyssinia61@gmail.com";

// Middleware: verify token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ error: "You must be logged in" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Helper: check if user is admin
const isAdmin = async(userId) => {
    const user = await User.findById(userId);
    return user && user.email === ADMIN_EMAIL;
};

// GET all books (public)
router.get("/", async(req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one book
router.get("/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create book (any logged-in user)
router.post("/", authMiddleware, async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const book = await Book.create({
            ...req.body,
            owner: user._id,
            ownerName: user.name,
        });

        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update book (owner or admin)
router.put("/:id", authMiddleware, async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        const admin = await isAdmin(req.userId);
        const isOwner = book.owner && book.owner.toString() === req.userId;

        if (!admin && !isOwner) {
            return res.status(403).json({ error: "You can only edit your own books" });
        }

        const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE book (owner or admin)
router.delete("/:id", authMiddleware, async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        const admin = await isAdmin(req.userId);
        const isOwner = book.owner && book.owner.toString() === req.userId;

        if (!admin && !isOwner) {
            return res.status(403).json({ error: "You can only delete your own books" });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;