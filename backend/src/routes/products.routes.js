const router = require('express').Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', authenticate, getProducts);
router.post('/', authenticate, addProduct);
router.put('/:productId', authenticate, updateProduct);
router.delete('/:productId', authenticate, deleteProduct);

module.exports = router;
