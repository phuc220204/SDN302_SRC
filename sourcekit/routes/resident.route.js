const router = require('express').Router();
const { protectView } = require('../middlewares/auth.middleware');
const c = require('../controllers/resident.controller');

router.use(protectView('/auth/signin')); // [ĐỔI THEO ĐỀ] path login view

router.get('/', c.list);
router.post('/', c.create);
router.post('/:id', c.update);   // form HTML không gửi được PUT -> dùng POST
router.delete('/:id', c.remove); // gọi từ fetch() nên DELETE được

module.exports = router;
