const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "ethiobooks_secret_key_123";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/register
router.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "Email already registered" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/login
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/google
router.post("/google", async(req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "Google token required" });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name: name || email.split("@")[0],
                email,
                password: await bcrypt.hash(Math.random().toString(36), 10),
            });
        }

        const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            token: jwtToken,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("Google auth error:", err);
        res.status(401).json({ error: "Invalid Google token" });
    }
});

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ error: "No token" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// GET /api/auth/me
router.get("/me", authMiddleware, async(req, res) => {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
});

module.exports = router;