// ============================================================
// Seed toàn bộ JSON của đề vào MongoDB bằng 1 lệnh: node utils/seed.js
// Hỗ trợ Extended JSON: { "$oid": "..." } -> ObjectId
// [ĐỔI THEO ĐỀ]: chỉ sửa seedMap (tên file -> Model)
// ============================================================
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const db = require('../models');

const seedMap = {
  accounts: db.Account,
  apartments: db.Apartment,
  residents: db.Resident,
};

// Đệ quy: gặp { $oid } thì đổi thành ObjectId (Mongoose không tự hiểu $oid)
const revive = (value) => {
  if (Array.isArray(value)) return value.map(revive);
  if (value && typeof value === 'object') {
    if (value.$oid) return new mongoose.Types.ObjectId(value.$oid);
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = revive(v);
    return out;
  }
  return value;
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected: ${mongoose.connection.name}`);
    for (const [file, Model] of Object.entries(seedMap)) {
      const filePath = path.join(__dirname, '..', 'data', `${file}.json`);
      const docs = revive(JSON.parse(fs.readFileSync(filePath, 'utf8')));
      await Model.deleteMany({});          // seed lại từ đầu, chạy nhiều lần OK
      await Model.insertMany(docs);
      console.log(`Seeded ${docs.length} docs -> collection "${Model.collection.name}"`);
    }
    console.log('DONE. Mở Compass kiểm tra lại tên DB + số documents!');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
