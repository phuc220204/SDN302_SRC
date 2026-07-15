const mongoose = require('mongoose');

// Model "cha" trong quan hệ 1-n (FA25: Nation)
const apartmentSchema = new mongoose.Schema(
  {
    apartmentName: { type: String, required: true, unique: true },
    totalOfFloors: { type: Number, required: true },
  },
  { timestamps: true }
);

// Tên model 'apartment' PHẢI khớp chuỗi ref trong model con
module.exports = mongoose.model('apartment', apartmentSchema, 'apartments');
