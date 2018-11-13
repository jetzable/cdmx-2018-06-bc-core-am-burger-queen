const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  table: {
    type: Number,
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  status: {
    type: Boolean,
    required: true
  },
  listOfProducts: [{
    type: String,
    required: true,
  }],
  listOfPrices: [{
    type: Number,
    required: true,
  }]
});

module.exports = mongoose.model("Order", OrderSchema);