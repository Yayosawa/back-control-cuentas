const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  contact_id: {
    type: String,
    required: true
  },
  contact_name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('transfer', transferSchema)