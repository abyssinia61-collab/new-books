const mongoose = require("mongoose");
const Book = require("./models/Book");
const User = require("./models/User");
require("dotenv").config();

const ADMIN_EMAIL = "abyssinia61@gmail.com";

mongoose
    .connect(process.env.MONGO_URI)
    .then(async() => {
        const admin = await User.findOne({ email: ADMIN_EMAIL });
        if (!admin) {
            console.error("❌ Admin user not found");
            process.exit(1);
        }

        const result = await Book.updateMany({ $or: [{ owner: null }, { owner: { $exists: false } }] }, { $set: { owner: admin._id, ownerName: admin.name } });

        console.log(`✅ Assigned ${result.modifiedCount} books to ${admin.name}`);
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });