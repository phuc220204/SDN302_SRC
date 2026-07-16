const db = require('../models');

// Controller cho phần VIEW (Task 03).
// Twist của đề SU25: form nhập AGE nhưng DB lưu yOB.
const currentYear = new Date().getFullYear();
const toYOB = (age) => currentYear - Number(age); // khi save
const toAge = (yOB) => currentYear - yOB;         // khi hiển thị

// Gom field từ form: spread trước, override các field cần biến đổi sau.
// Field lạ (vd 'age') bị Mongoose strict mode loại tự động -> an toàn.
const buildData = (body) => ({
  ...body,
  yOB: toYOB(body.age),
  isOwned: body.isOwned === 'on', // checkbox gửi "on", bỏ tick thì KHÔNG gửi gì -> false
});

// Helper render list. editId != null -> view tự mở modal Edit của item đó.
const renderList = async (res, { error = null, status = 200, editId = null } = {}) => {
  const residents = await db.Resident.find().populate('apartment', 'apartmentName');
  const apartments = await db.Apartment.find(); // cho <select> trong modal
  res.status(status).render('residents', { residents, apartments, toAge, error, editId });
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

// [GET] /view/residents/:id — mở đúng form update của 1 item (đề yêu cầu có route /:id)
const detail = async (req, res, next) => {
  try {
    await renderList(res, { editId: req.params.id });
  } catch (err) { next(err); }
};

// [POST] /view/residents — add từ modal form
const create = async (req, res, next) => {
  try {
    await db.Resident.create(buildData(req.body));
    res.redirect('/view/residents');
  } catch (err) {
    // Không ném 500: hiển thị lỗi (unique, min/max...) ngay trên view
    try { await renderList(res, { error: friendlyError(err), status: 400 }); } catch (e) { next(e); }
  }
};

// [POST] /view/residents/:id — update từ modal form (form HTML không gửi được PUT)
const update = async (req, res, next) => {
  try {
    const updated = await db.Resident.findByIdAndUpdate(
      req.params.id,
      buildData(req.body),
      { new: true, runValidators: true }
    );
    if (!updated) return renderList(res, { error: 'Resident not found', status: 404 });
    res.redirect('/view/residents');
  } catch (err) {
    try { await renderList(res, { error: friendlyError(err), status: 400 }); } catch (e) { next(e); }
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

module.exports = { list, detail, create, update, remove };
