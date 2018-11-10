const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  food: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Food"
  },
  drink: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Drink"
  },
  total: {
    type: Number,
    required: true
  },
  extra: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: "Extra"
  },
  side: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: "Extra"
  },
  table: {
    type: Number,
    required: true
  },
  employee: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Order", OrderSchema);
