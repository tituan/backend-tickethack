const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
    timeTo: String,
    tripId: ObjectId,
});

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
