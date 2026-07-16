const bcrypt = require('bcrypt');
const db = require('../models');
const { generateToken } = require('../utils/jwt');

const apiLogin = async (req, res, next) => {
  try {
    const { us, pw } = req.body;
    const account = await db.Account.findOne({ us });
    if (!account || !(await bcrypt.compare(pw, account.pw))) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = generateToken({ id: account._id, us: account.us });
    return res.status(200).json({ status: 'success', token });
  } catch (err) {
    next(err);
  }
};

const showLogin = (req, res) => res.render('login', { error: null });

const viewLogin = async (req, res, next) => {
  try {
    const { us, pw } = req.body;
    const account = await db.Account.findOne({ us });
    if (!account || !(await bcrypt.compare(pw, account.pw))) {
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }
    req.session.user = { id: account._id, us: account.us };
    return res.redirect('/view/residents');
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/signin'));
};

module.exports = { apiLogin, showLogin, viewLogin, logout };
