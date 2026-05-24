const router = require('express').Router();
const { getCustomers, getCustomerById } = require('../controllers/customers.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', authenticate, getCustomers);
router.get('/:customerId', authenticate, getCustomerById);

module.exports = router;
