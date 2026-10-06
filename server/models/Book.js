const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    coverImage: {
        type: String,
        default: "https://via.placeholder.com/150x220",
    },
    category: { type: String, default: "General" },
    stock: { type: Number, default: 0 },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    ownerName: { type: String, default: "EthioBooks" },
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);