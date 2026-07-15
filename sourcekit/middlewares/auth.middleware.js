const jwt = require('jsonwebtoken');

// HYBRID: lấy token từ header "Authorization: Bearer xxx" (Postman/Task 02)
// HOẶC từ cookie "token" (browser/Task 03). 1 middleware dùng cho cả 2 task.
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

// Bảo vệ REST API -> fail trả JSON 401 (đúng chuẩn để Postman test)
const protectApi = (req, res, next) => {
  const { user, error } = verifyCore(req);
  if (error) return res.status(401).json({ message: error });
  req.user = user;
  next();
};

// Bảo vệ view -> fail redirect về trang login. [ĐỔI THEO ĐỀ] path login
const protectView = (loginPath = '/auth/signin') => (req, res, next) => {
  const { user, error } = verifyCore(req);
  if (error) return res.redirect(loginPath);
  req.user = user;
  next();
};

module.exports = { protectApi, protectView };
