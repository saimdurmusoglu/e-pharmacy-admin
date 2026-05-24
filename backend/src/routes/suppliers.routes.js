const router = require('express').Router();
const { getSuppliers, addSupplier, updateSupplier } = require('../controllers/suppliers.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', authenticate, getSuppliers);
router.post('/', authenticate, addSupplier);
router.put('/:supplierId', authenticate, updateSupplier);

module.exports = router;
