const mongoose = require('mongoose');

// Model "con" trong quan hệ 1-n (FA25: Food | SP26: Pen)
const residentSchema = new mongoose.Schema(
  {
    residentName: {
      type: String,
      required: true,
      unique: true,
      // Chặn ngay ở server: đề bắt "only letters (a-z, A-Z) and space".
      // HTML pattern chỉ chặn phía browser -> gửi bằng Postman vẫn lọt nếu thiếu dòng này.
      match: [/^[A-Za-z ]+$/, 'Only letters (a-z, A-Z) and space are allowed'],
    },
    residentDescription: { type: String, required: true },
    floor: { type: Number, required: true, min: 1, max: 40 },
    yOB: { type: Number, required: true, min: 1940, max: 2025 },
    isOwned: { type: Boolean, default: false },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'apartment', // khớp tên model cha
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('resident', residentSchema, 'residents');
