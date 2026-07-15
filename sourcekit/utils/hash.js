// Tiện ích tạo hash bcrypt khi đề bắt tự tạo account (thay vì cho sẵn hash)
// Chạy: node utils/hash.js 123456789
const bcrypt = require('bcrypt');
const plain = process.argv[2] || '123456789';
bcrypt.hash(plain, 10).then((hash) => console.log(hash));
