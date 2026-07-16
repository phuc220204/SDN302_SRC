const bcrypt = require('bcrypt');
const db = require('../models');
const { generateToken } = require('../utils/jwt');

// [ĐỔI THEO ĐỀ] field account + path:
// SP26: name/code, API /auth/tokens, view /auth/access
// SU25: us/pw,     API /auth/login,  view /auth/signin
// FA25: name/key,  API /auth/signin, view /auth/login   <-- 2 path BỊ HOÁN ĐỔI, luôn đọc đề!

// [POST] API — trả JWT dạng JSON cho Postman (Task 02)
const apiLogin = async (req, res, next) => {
  try {
    const { us, pw } = req.body;
    const account = await db.Account.findOne({ us });
    // Gộp 2 case (sai user / sai pass) thành 1 message để không lộ field nào sai
    if (!account || !(await bcrypt.compare(pw, account.pw))) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = generateToken({ id: account._id, us: account.us });
    return res.status(200).json({ status: 'success', token });
  } catch (err) {
    next(err);
  }
};

// [GET] view — render form login (Task 03)
const showLogin = (req, res) => res.render('login', { error: null });

// [POST] view — login form -> lưu session -> redirect (Task 03)
const viewLogin = async (req, res, next) => {
  try {
    const { us, pw } = req.body;
    const account = await db.Account.findOne({ us });
    if (!account || !(await bcrypt.compare(pw, account.pw))) {
      // YÊU CẦU ĐỀ: hiển thị error message trên view khi login fail
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }
    // Chỉ lưu thông tin định danh, TUYỆT ĐỐI không lưu JWT vào session
    req.session.user = { id: account._id, us: account.us };
    return res.redirect('/view/residents'); // [ĐỔI THEO ĐỀ]
  } catch (err) {
    next(err);
  }
};

// [GET] view — logout, tiện test lại luồng login nhiều lần
const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/signin')); // [ĐỔI THEO ĐỀ]
};

module.exports = { apiLogin, showLogin, viewLogin, logout };
