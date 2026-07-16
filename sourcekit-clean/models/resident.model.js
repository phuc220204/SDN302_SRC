const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema(
  {
    residentName: {
      type: String,
      required: true,
      unique: true,
      match: [/^[A-Za-z ]+$/, 'Only letters (a-z, A-Z) and space are allowed'],
    },
    residentDescription: { type: String, required: true },
    floor: { type: Number, required: true, min: 1, max: 40 },
    yOB: { type: Number, required: true, min: 1940, max: 2025 },
    isOwned: { type: Boolean, default: false },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'apartment',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('resident', residentSchema, 'residents');
