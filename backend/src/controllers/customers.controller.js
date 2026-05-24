const Customer = require('../models/customer.model');

// GET /api/customers
const getCustomers = async (req, res, next) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);

    const [customers, total] = await Promise.all([
      Customer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Customer.countDocuments(filter),
    ]);

    res.status(200).json({
      customers,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/customers/:customerId
const getCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCustomers, getCustomerById };
