const router = require('express').Router();
const { getOrders } = require('../controllers/orders.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', authenticate, getOrders);

module.exports = router;
