import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "./models/Order.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "celesse_secret_key";

app.use(cors());
app.use(express.json());

// 🔥 CONNECT MONGODB ATLAS
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/celesse")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔥 PRODUCT SCHEMA
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
});
const Product = mongoose.model("Product", productSchema);

// 🔥 GET PRODUCTS
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔥 ADD PRODUCT
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// 🔥 PLACE ORDER
app.post("/orders", async (req, res) => {
  try {
    const { items, total, email, customer } = req.body;
    const newOrder = new Order({ items, total, email, customer });
    await newOrder.save();
    res.json({ message: "Order saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 GET ORDERS BY EMAIL
app.get("/orders/:email", async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 UPDATE USER PROFILE
app.put("/user/update", async (req, res) => {
  try {
    const { email, phone, address, name } = req.body;
    const updated = await User.findOneAndUpdate(
      { email },
      { phone, address, name },
      { new: true }
    );
    res.json({
      message: "Profile updated!",
      user: {
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        address: updated.address,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});