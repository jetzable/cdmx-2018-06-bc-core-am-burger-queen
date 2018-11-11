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
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Product"
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model("Order", OrderSchema);