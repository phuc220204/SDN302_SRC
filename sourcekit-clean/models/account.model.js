const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    us: { type: String, required: true },
    pw: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('account', accountSchema, 'accounts');
