const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: String,
  packageName: String,
  amount: Number,
  paymentId: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
