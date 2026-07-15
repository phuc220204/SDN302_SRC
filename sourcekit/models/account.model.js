const mongoose = require('mongoose');

// [ĐỔI THEO ĐỀ] tên field: SU25 = us/pw | FA25 = name/key
const accountSchema = new mongoose.Schema(
  {
    us: { type: String, required: true },
    pw: { type: String, required: true },
  },
  { timestamps: true }
);

// (tên model, schema, TÊN COLLECTION khớp file JSON import)
module.exports = mongoose.model('account', accountSchema, 'accounts');
