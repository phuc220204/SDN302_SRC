const jwt = require('jsonwebtoken');

const protectApi = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const protectView = (loginPath = '/auth/signin') => (req, res, next) => {
  if (!req.session || !req.session.user) return res.redirect(loginPath);
  next();
};

module.exports = { protectApi, protectView };
