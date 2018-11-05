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
  client: {
    type: String,
    required: false
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
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
    required: false
  }
});

module.exports = mongoose.model("Order", OrderSchema);
