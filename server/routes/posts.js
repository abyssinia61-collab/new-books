const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "ethiobooks_secret_key_123";

// ---- Auth Middleware ----
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

// ---- GET all posts ----
router.get("/", async(req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- POST create post ----
router.post("/", authMiddleware, async(req, res) => {
    try {
        const { bookTitle, rating, content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ error: "Content is required" });
        }

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const post = await Post.create({
            user: user._id,
            userName: user.name,
            bookTitle: bookTitle || "",
            rating: rating || 5,
            content: content.trim(),
        });

        res.status(201).json(post);
    } catch (err) {
        console.log("❌ Post create error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ---- POST like a post ----
router.post("/:id/like", async(req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id, { $inc: { likes: 1 } }, { new: true }
        );
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- POST comment on a post ----
router.post("/:id/comment", authMiddleware, async(req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        post.comments.push({
            userName: user.name,
            text: text.trim(),
        });

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- DELETE a post (only the owner) ----
// ---- DELETE a post (owner OR admin) ----
router.delete("/:id", authMiddleware, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const ADMIN_EMAIL = "abyssinia61@gmail.com";
        const isAdmin = user.email === ADMIN_EMAIL;
        const isOwner = post.userName === user.name;

        if (!isAdmin && !isOwner) {
            return res
                .status(403)
                .json({ error: "You can only delete your own posts" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (err) {
        console.log("❌ Post delete error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;