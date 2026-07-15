// Dùng khi KHÔNG xài express-generator (chạy: node server.js)
// Nếu đã dùng generator thì bin/www lo phần listen -> xóa file này đi.
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
