const Order = require('../models/order.model');

// GET /api/orders
const getOrders = async (req, res, next) => {
  try {
    const { name, status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.status(200).json({
      orders,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOrders };
