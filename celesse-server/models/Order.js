import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: String,
  customer: {
    name: String,
    address: String,
    phone: String,
  },
  items: [
    {
      _id: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);