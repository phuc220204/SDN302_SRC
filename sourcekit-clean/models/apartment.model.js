const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema(
  {
    apartmentName: { type: String, required: true, unique: true },
    totalOfFloors: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('apartment', apartmentSchema, 'apartments');
