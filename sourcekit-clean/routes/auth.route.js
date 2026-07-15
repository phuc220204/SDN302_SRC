const router = require('express').Router();
const auth = require('../controllers/auth.controller');

router.post('/login', auth.apiLogin);
router.get('/signin', auth.showLogin);
router.post('/signin', auth.viewLogin);

module.exports = router;
