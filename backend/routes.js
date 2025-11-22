const express = require("express");
const Razorpay = require("razorpay");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Booking = require("./models/Booking");
const Feedback = require("./models/Feedback");

const { razorpay_key, razorpay_secret, jwtSecret } = require("./config");

const router = express.Router();

const rzp = new Razorpay({
  key_id: razorpay_key,
  key_secret: razorpay_secret
});

// SIGNUP
router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;

  let hashed = await bcrypt.hash(password, 10);

  let user = await User.create({ name, email, password: hashed });

  res.json({ status: "ok", user });
});

// LOGIN
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.json({ error: "User not found" });

  let match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ error: "Incorrect password" });

  let token = jwt.sign({ id: user._id }, jwtSecret);
  res.json({ status: "ok", token });
});

// ORDER CREATE
router.post("/create-order", async (req, res) => {
  let { amount } = req.body;

  const order = await rzp.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_1"
  });

  res.json(order);
});

// SAVE BOOKING
router.post("/booking", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json({ status: "ok", booking });
});

// FEEDBACK
router.post("/feedback", async (req, res) => {
  const fb = await Feedback.create(req.body);
  res.json({ status: "ok", fb });
});

module.exports = router;
