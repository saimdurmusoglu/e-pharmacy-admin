const Product = require('../models/product.model');
const Supplier = require('../models/supplier.model');
const Customer = require('../models/customer.model');
const IncomeExpense = require('../models/incomeExpense.model');

// GET /api/dashboard
const getDashboard = async (req, res, next) => {
  try {
    const [productsCount, suppliersCount, customersCount, recentCustomers, transactions] =
      await Promise.all([
        Product.countDocuments(),
        Supplier.countDocuments(),
        Customer.countDocuments(),
        Customer.find().sort({ createdAt: -1 }).limit(5).select('name email photo spent address'),
        IncomeExpense.find().sort({ createdAt: -1 }).limit(10),
      ]);

    res.status(200).json({
      stats: {
        products: productsCount,
        suppliers: suppliersCount,
        customers: customersCount,
      },
      recentCustomers,
      transactions,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
