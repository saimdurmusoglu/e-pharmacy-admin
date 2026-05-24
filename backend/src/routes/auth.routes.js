const router = require('express').Router();
const { login, logout, getUserInfo } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/login', login);
router.get('/logout', authenticate, logout);
router.get('/user-info', authenticate, getUserInfo);

module.exports = router;
