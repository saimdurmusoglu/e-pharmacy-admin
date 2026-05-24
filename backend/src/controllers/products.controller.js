const Product = require('../models/product.model');

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { name, category, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/products
const addProduct = async (req, res, next) => {
  try {
    const { name, category, stock, suppliers, price, photo } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category and price are required' });
    }

    const product = await Product.create({ name, category, stock, suppliers, price, photo });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:productId
const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:productId
const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
