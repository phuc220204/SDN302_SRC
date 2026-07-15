const mongoose = require('mongoose');

// Kết nối MongoDB. Fail thì log lỗi gốc và thoát (không dùng next() ở đây
// vì đây là hàm thường, không phải middleware!)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
