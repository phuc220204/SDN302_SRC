const db = require('../models');

// Controller cho phần VIEW (Task 03).
// Pattern đặc biệt của đề SU25: form nhập AGE nhưng DB lưu yOB.
const currentYear = new Date().getFullYear();
const toYOB = (age) => currentYear - Number(age); // khi save
const toAge = (yOB) => currentYear - yOB;         // khi hiển thị

// Helper render list (dùng chung cho GET và khi create/update lỗi)
const renderList = async (res, error = null, status = 200) => {
  const residents = await db.Resident.find().populate('apartment', 'apartmentName');
  const apartments = await db.Apartment.find(); // cho <select> trong modal
  res.status(status).render('residents', { residents, apartments, toAge, error });
};

// Dịch lỗi Mongoose thành message thân thiện trên view
const friendlyError = (err) => {
  if (err.code === 11000) return 'Resident name must be unique';
  if (err.name === 'ValidationError')
    return Object.values(err.errors).map((e) => e.message).join(', ');
  return err.message;
};

// [GET] /view/residents — card list
const list = async (req, res, next) => {
  try {
    await renderList(res);
  } catch (err) { next(err); }
};

// [POST] /view/residents — add từ modal form
const create = async (req, res, next) => {
  try {
    const { residentName, residentDescription, floor, age, apartment } = req.body;
    await db.Resident.create({
      residentName,
      residentDescription,
      floor,
      yOB: toYOB(age),                    // đề: nhập age -> lưu năm sinh
      isOwned: req.body.isOwned === 'on', // checkbox HTML gửi "on" hoặc không gửi gì
      apartment,
    });
    res.redirect('/view/residents');
  } catch (err) {
    // Không ném 500: hiển thị lỗi (unique, min/max...) ngay trên view
    try { await renderList(res, friendlyError(err), 400); } catch (e) { next(e); }
  }
};

// [POST] /view/residents/:id — update từ modal form
const update = async (req, res, next) => {
  try {
    const { residentName, residentDescription, floor, age, apartment } = req.body;
    const updated = await db.Resident.findByIdAndUpdate(
      req.params.id,
      {
        residentName,
        residentDescription,
        floor,
        yOB: toYOB(age),
        isOwned: req.body.isOwned === 'on',
        apartment,
      },
      { new: true, runValidators: true }
    );
    if (!updated) return renderList(res, 'Resident not found', 404);
    res.redirect('/view/residents');
  } catch (err) {
    try { await renderList(res, friendlyError(err), 400); } catch (e) { next(e); }
  }
};

// [DELETE] /view/residents/:id — gọi bằng fetch() từ view, trả JSON để alert
const remove = async (req, res, next) => {
  try {
    const deleted = await db.Resident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Resident not found' });
    res.status(200).json({ message: 'Delete resident successfully' });
  } catch (err) { next(err); }
};

module.exports = { list, create, update, remove };
