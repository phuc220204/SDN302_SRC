const router = require('express').Router();
const { protectView } = require('../middlewares/auth.middleware');
const c = require('../controllers/resident.controller');

router.use(protectView('/auth/signin'));

router.get('/', c.list);
router.post('/', c.create);
router.post('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
