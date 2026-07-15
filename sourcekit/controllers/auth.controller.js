const bcrypt = require('bcrypt');
const db = require('../models');
const { generateToken } = require('../utils/jwt');

// [ĐỔI THEO ĐỀ] SU25: field us/pw, API tại /auth/login, view tại /auth/signin
//               FA25: field name/key và 2 route BỊ HOÁN ĐỔI -> luôn đọc kỹ đề!

// [POST] /auth/login — Task 02: trả JWT dạng JSON cho Postman
const apiLogin = async (req, res, next) => {
  try {
    const { us, pw } = req.body;
    const account = await db.Account.findOne({ us });
    // Gộp 2 case (sai user / sai pass) thành 1 message để code ngắn
    if (!account || !(await bcrypt.compare(pw, account.pw))) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = generateToken({ id: account._id, us: account.us });
    return res.status(200).json({ status: 'success', token });
  } catch (err) {
    next(err);
  }
};

// [GET] /auth/signin — Task 03: render form login
const showLogin = (req, res) => res.render('login', { error: null });

// [POST] /auth/signin — Task 03: login form -> set cookie -> redirect
const viewLogin = async (req, res, next) => {
  try {
    const { us, pw } = req.body;
    const account = await db.Account.findOne({ us });
    if (!account || !(await bcrypt.compare(pw, account.pw))) {
      // YÊU CẦU ĐỀ: hiển thị error message trên view khi login fail
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }
    const token = generateToken({ id: account._id, us: account.us });
    res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    return res.redirect('/view/residents'); // [ĐỔI THEO ĐỀ]
  } catch (err) {
    next(err);
  }
};

module.exports = { apiLogin, showLogin, viewLogin };
