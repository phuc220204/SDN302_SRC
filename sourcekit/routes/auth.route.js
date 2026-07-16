const router = require('express').Router();
const auth = require('../controllers/auth.controller');

// [ĐỔI THEO ĐỀ] SU25: /login = API JWT, /signin = form view
// (SP26: /tokens = API, /access = view | FA25: /signin = API, /login = view)
router.post('/login', auth.apiLogin);   // Task 02
router.get('/signin', auth.showLogin);  // Task 03
router.post('/signin', auth.viewLogin); // Task 03
router.get('/logout', auth.logout);

module.exports = router;
