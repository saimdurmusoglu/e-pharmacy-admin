const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  photo: { type: String, default: '' },
  name: { type: String, required: true },
  address: { type: String, default: '' },
  suppliers: { type: String, default: '' },
  date: { type: String, default: '' },
  amount: { type: String, default: '0' },
  status: {
    type: String,
    enum: ['Active', 'Deactive'],
    default: 'Active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
