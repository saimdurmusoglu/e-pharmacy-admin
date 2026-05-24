const Supplier = require('../models/supplier.model');

// GET /api/suppliers
const getSuppliers = async (req, res, next) => {
  try {
    const { name, status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [suppliers, total] = await Promise.all([
      Supplier.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Supplier.countDocuments(filter),
    ]);

    res.status(200).json({
      suppliers,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/suppliers
const addSupplier = async (req, res, next) => {
  try {
    const { name, address, suppliers, date, amount, status, photo } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const supplier = await Supplier.create({ name, address, suppliers, date, amount, status, photo });
    res.status(201).json(supplier);
  } catch (err) {
    next(err);
  }
};

// PUT /api/suppliers/:supplierId
const updateSupplier = async (req, res, next) => {
  try {
    const { supplierId } = req.params;
    const updates = req.body;

    const supplier = await Supplier.findByIdAndUpdate(supplierId, updates, {
      new: true,
      runValidators: true,
    });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json(supplier);
  } catch (err) {
    next(err);
  }
};

module.exports = { getSuppliers, addSupplier, updateSupplier };
