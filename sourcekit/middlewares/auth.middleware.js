const jwt = require('jsonwebtoken');

// ============ TASK 02 — bảo vệ REST API ============
// JWT CHỈ đọc từ header "Authorization: Bearer <token>".
// Không đọc/ghi cookie: đề SP26 ghi rõ "Do not store the JWT in cookies or session storage".
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

// ============ TASK 03 — bảo vệ view ============
// Chỉ kiểm tra trạng thái đăng nhập trong session (session KHÔNG chứa JWT).
// Fail thì redirect về trang login. [ĐỔI THEO ĐỀ] path login view.
const protectView = (loginPath = '/auth/signin') => (req, res, next) => {
  if (!req.session || !req.session.user) return res.redirect(loginPath);
  next();
};

module.exports = { protectApi, protectView };
