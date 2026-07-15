const jwt = require('jsonwebtoken');

const getToken = (req) => {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) return header.split(' ')[1];
  return (req.cookies && req.cookies.token) || null;
};

const verifyCore = (req) => {
  const token = getToken(req);
  if (!token) return { error: 'No token provided' };
  try {
    return { user: jwt.verify(token, process.env.JWT_SECRET) };
  } catch (err) {
    return { error: 'Invalid or expired token' };
  }
};

const protectApi = (req, res, next) => {
  const { user, error } = verifyCore(req);
  if (error) return res.status(401).json({ message: error });
  req.user = user;
  next();
};

const protectView = (loginPath = '/auth/signin') => (req, res, next) => {
  const { user, error } = verifyCore(req);
  if (error) return res.redirect(loginPath);
  req.user = user;
  next();
};

module.exports = { protectApi, protectView };
