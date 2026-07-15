const router = require('express').Router();
const auth = require('../controllers/auth.controller');

// [ĐỔI THEO ĐỀ] SU25: /auth/login = API JWT, /auth/signin = form view
// (FA25 thì NGƯỢC LẠI -> chỉ cần đổi path ở đây, controller giữ nguyên)
router.post('/login', auth.apiLogin);   // Task 02
router.get('/signin', auth.showLogin);  // Task 03
router.post('/signin', auth.viewLogin); // Task 03

module.exports = router;
