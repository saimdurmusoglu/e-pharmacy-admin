const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/user.model');
const Customer = require('./models/customer.model');
const Product = require('./models/product.model');
const Order = require('./models/order.model');
const Supplier = require('./models/supplier.model');
const IncomeExpense = require('./models/incomeExpense.model');

const customers = require('../data/customers.json');
const products = require('../data/products.json');
const orders = require('../data/orders.json');
const suppliers = require('../data/suppliers.json');
const incomeExpenses = require('../data/Income-Expenses.json');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear all collections
    await Promise.all([
      User.deleteMany(),
      Customer.deleteMany(),
      Product.deleteMany(),
      Order.deleteMany(),
      Supplier.deleteMany(),
      IncomeExpense.deleteMany(),
    ]);
    console.log('🗑️  Collections cleared');

    // Create admin user
    const hashedPassword = await bcrypt.hash('vendor123', 10);
    await User.create({
      name: 'Clayton Santos',
      email: 'vendor@gmail.com',
      password: 'vendor123',
    });

    // Seed customers
    const cleanCustomers = customers.map(c => ({
      photo: c.photo || c.image || '',
      name: c.name,
      email: c.email,
      spent: c.spent || '0',
      phone: c.phone || '',
      address: c.address || '',
      register_date: c.register_date || '',
    }));
    await Customer.insertMany(cleanCustomers);
    console.log(`✅ ${cleanCustomers.length} customers seeded`);

    // Seed products
    const cleanProducts = products.map(p => ({
      photo: p.photo || '',
      name: p.name,
      suppliers: p.suppliers || '',
      stock: p.stock || '0',
      price: p.price,
      category: p.category,
    }));
    await Product.insertMany(cleanProducts);
    console.log(`✅ ${cleanProducts.length} products seeded`);

    // Seed orders
    const cleanOrders = orders.map(o => ({
      photo: o.photo || '',
      name: o.name,
      address: o.address,
      products: o.products || '0',
      price: o.price,
      status: o.status,
      order_date: o.order_date || '',
    }));
    await Order.insertMany(cleanOrders);
    console.log(`✅ ${cleanOrders.length} orders seeded`);

    // Seed suppliers
    const cleanSuppliers = suppliers.map(s => ({
      photo: s.photo || '',
      name: s.name,
      address: s.address || '',
      suppliers: s.suppliers || '',
      date: s.date || '',
      amount: s.amount || '0',
      status: s.status || 'Active',
    }));
    await Supplier.insertMany(cleanSuppliers);
    console.log(`✅ ${cleanSuppliers.length} suppliers seeded`);

    // Seed income/expenses
    const cleanTransactions = incomeExpenses.map(t => ({
      name: t.name,
      amount: t.amount,
      type: t.type,
    }));
    await IncomeExpense.insertMany(cleanTransactions);
    console.log(`✅ ${cleanTransactions.length} transactions seeded`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
