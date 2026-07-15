const router = require('express').Router();
const { protectApi } = require('../middlewares/auth.middleware');
const c = require('../controllers/apartment.controller');

router.use(protectApi); // toàn bộ API cần JWT

router.get('/', c.getAll);
router.get('/:id', c.getById);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
