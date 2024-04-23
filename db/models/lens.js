const mongoose = require("mongoose");

const lensSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    focallength: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ["Wide", "Normal", "Tele"]
        },
    },
});

module.exports = mongoose.model("LensItem", lensSchema);
