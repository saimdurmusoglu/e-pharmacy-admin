import type { Customer, Order, Product, Supplier, Transaction, DashboardData } from '../types';

export const mockCustomers: Customer[] = [
  { _id: '1', name: 'Alex Shatov',    email: 'alexshatov@gmail.com', address: 'Mripur-1',   phone: '+8801736985253', register_date: 'Aug 1, 2023', spent: '2,890.66', photo: 'https://i.pravatar.cc/40?img=1' },
  { _id: '2', name: 'Philip Harbach', email: 'philip.h@gmail.com',   address: 'Dhonmondi',  phone: '+8801636985275', register_date: 'Aug 1, 2023', spent: '2,767.04', photo: 'https://i.pravatar.cc/40?img=2' },
  { _id: '3', name: 'Mirko Fisuk',    email: 'mirkofisuk@gmail.com', address: 'Uttara-6',   phone: '+8801336985214', register_date: 'Aug 1, 2023', spent: '2,996.00', photo: 'https://i.pravatar.cc/40?img=3' },
  { _id: '4', name: 'Olga Semklo',    email: 'olga.s@cool.design',   address: 'Gulshan-1',  phone: '+8801736985264', register_date: 'Aug 1, 2023', spent: '1,220.66', photo: 'https://i.pravatar.cc/40?img=4' },
  { _id: '5', name: 'Burak Long',     email: 'longburak@gmail.com',  address: 'Mirpur-12',  phone: '+8801736984514', register_date: 'Aug 1, 2023', spent: '1,890.66', photo: 'https://i.pravatar.cc/40?img=5' },
];

export const mockOrders: Order[] = [
  { _id: '1', photo: 'https://i.pravatar.cc/40?img=1', name: 'Alex Shatov',    address: 'Mripur-1',  products: '12', price: '890.66',  status: 'completed',  order_date: 'July 31, 2023' },
  { _id: '2', photo: 'https://i.pravatar.cc/40?img=2', name: 'Philip Harbach', address: 'Dhonmondi', products: '19', price: '340.16',  status: 'confirmed',  order_date: 'July 31, 2023' },
  { _id: '3', photo: 'https://i.pravatar.cc/40?img=3', name: 'Mirko Fisuk',    address: 'Uttara-6',  products: '9',  price: '530.76',  status: 'pending',    order_date: 'July 31, 2023' },
  { _id: '4', photo: 'https://i.pravatar.cc/40?img=4', name: 'Olga Semklo',    address: 'Gulshan-1', products: '14', price: '280.57',  status: 'cancelled',  order_date: 'July 31, 2023' },
  { _id: '5', photo: 'https://i.pravatar.cc/40?img=5', name: 'Burak Long',     address: 'Mirpur-12', products: '10', price: '567.34',  status: 'processing', order_date: 'July 31, 2023' },
];

export const mockProducts: Product[] = [
  { _id: '1', name: 'Moringa',           category: 'Medicine', stock: 12, suppliers: 'Square',   price: 89.66 },
  { _id: '2', name: 'Antibiotic 250 mg', category: 'Head',     stock: 19, suppliers: 'Acme',     price: 34.16 },
  { _id: '3', name: 'Headache Relief',   category: 'Head',     stock: 9,  suppliers: 'Beximco',  price: 53.76 },
  { _id: '4', name: 'Pharmacy',          category: 'Hand',     stock: 14, suppliers: 'ACI',      price: 28.57 },
  { _id: '5', name: 'Magnesium',         category: 'Medicine', stock: 10, suppliers: 'Uniliver', price: 56.34 },
];

export const mockSuppliers: Supplier[] = [
  { _id: '1', photo: 'https://i.pravatar.cc/40?img=1', name: 'Alex Shatov',    address: 'Mripur-1',  suppliers: 'Square',   date: 'August 1, 2023', amount: '6,952.53', status: 'active' },
  { _id: '2', photo: 'https://i.pravatar.cc/40?img=2', name: 'Philip Harbach', address: 'Dhonmondi', suppliers: 'Acme',     date: 'August 1, 2023', amount: '8,527.58', status: 'active' },
  { _id: '3', photo: 'https://i.pravatar.cc/40?img=3', name: 'Mirko Fisuk',    address: 'Uttara-6',  suppliers: 'Beximco',  date: 'August 1, 2023', amount: '2,698.50', status: 'active' },
  { _id: '4', photo: 'https://i.pravatar.cc/40?img=4', name: 'Olga Semklo',    address: 'Gulshan-1', suppliers: 'ACI',      date: 'August 1, 2023', amount: '9,852.64', status: 'active' },
  { _id: '5', photo: 'https://i.pravatar.cc/40?img=5', name: 'Burak Long',     address: 'Mirpur-12', suppliers: 'Uniliver', date: 'August 1, 2023', amount: '1,736.90', status: 'deactive' },
];

export const mockTransactions: Transaction[] = [
  { _id: '1', type: 'Expense', name: 'Qonto billing',                                      address: 'London',    amount: '-49.88'  },
  { _id: '2', type: 'Income',  name: 'Cruip.com Market Ltd 70 Wilson St London',            address: 'London',    amount: '+249.88' },
  { _id: '3', type: 'Income',  name: 'Notion Labs Inc',                                    address: 'New York',  amount: '+99.99'  },
  { _id: '4', type: 'Income',  name: 'Market Cap Ltd',                                     address: 'Berlin',    amount: '+1200.88'},
  { _id: '5', type: 'Error',   name: 'App.com Market Ltd 70 Wilson St London',              address: 'London',    amount: '99.99'   },
  { _id: '6', type: 'Expense', name: 'App.com Market Ltd 70 Wilson St London',              address: 'London',    amount: '-49.88'  },
];

export const mockDashboard: DashboardData = {
  stats: { products: 8430, suppliers: 211, customers: 140 },
  recentCustomers: mockCustomers,
  transactions: mockTransactions,
};
