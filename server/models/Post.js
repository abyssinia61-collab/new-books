const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: { type: String, required: true }, // denormalized for quick display
    bookTitle: { type: String, default: "" }, // optional — which book
    rating: { type: Number, min: 1, max: 5, default: 5 },
    content: { type: String, required: true, maxlength: 1000 },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);