const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
    tripId: ObjectId,
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;
