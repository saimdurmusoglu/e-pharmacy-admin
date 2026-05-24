const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    photo: {type: String, default: ""},
    name: {type: String, required: true},
    suppliers: {type: String, default: ""},
    stock: {type: String, default: "0"},
    price: {type: String, required: true},
    category: {
      type: String,
      enum: [
        "Medicine",
        "Head",
        "Hand",
        "Heart",
        "Leg",
        "Dental Care",
        "Skin Care",
        "Eye Care",
        "Vitamins & Supplements",
        "Orthopedic Products",
        "Baby Care",
      ],
      required: true,
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model("Product", productSchema);
