const router = require('express').Router();
const { getCustomers, getCustomerById, updateCustomer } = require('../controllers/customers.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', authenticate, getCustomers);
router.get('/:customerId', authenticate, getCustomerById);
router.put('/:customerId', authenticate, updateCustomer);

module.exports = router;
