import type { Customer, Order, Product, Supplier, Transaction, DashboardData } from '../types';

export const mockCustomers: Customer[] = [
  { _id: '1', name: 'Alex Shatov', email: 'alexshatov@gmail.com', address: 'Mripur-1', phone: '+8801736985253', registerDate: 'Aug 1, 2023', spent: 2890.66, avatar: 'https://i.pravatar.cc/40?img=1' },
  { _id: '2', name: 'Philip Harbach', email: 'philip.h@gmail.com', address: 'Dhonmondi', phone: '+8801636985275', registerDate: 'Aug 1, 2023', spent: 2767.04, avatar: 'https://i.pravatar.cc/40?img=2' },
  { _id: '3', name: 'Mirko Fisuk', email: 'mirkofisuk@gmail.com', address: 'Uttara-6', phone: '+8801336985214', registerDate: 'Aug 1, 2023', spent: 2996.00, avatar: 'https://i.pravatar.cc/40?img=3' },
  { _id: '4', name: 'Olga Semklo', email: 'olga.s@cool.design', address: 'Gulshan-1', phone: '+8801736985264', registerDate: 'Aug 1, 2023', spent: 1220.66, avatar: 'https://i.pravatar.cc/40?img=4' },
  { _id: '5', name: 'Burak Long', email: 'longburak@gmail.com', address: 'Mirpur-12', phone: '+8801736984514', registerDate: 'Aug 1, 2023', spent: 1890.66, avatar: 'https://i.pravatar.cc/40?img=5' },
];

export const mockOrders: Order[] = [
  { _id: '1', userInfo: { name: 'Alex Shatov', avatar: 'https://i.pravatar.cc/40?img=1' }, address: 'Mripur-1', products: 12, orderDate: 'July 31, 2023', price: 890.66, status: 'completed' },
  { _id: '2', userInfo: { name: 'Philip Harbach', avatar: 'https://i.pravatar.cc/40?img=2' }, address: 'Dhonmondi', products: 19, orderDate: 'July 31, 2023', price: 340.16, status: 'confirmed' },
  { _id: '3', userInfo: { name: 'Mirko Fisuk', avatar: 'https://i.pravatar.cc/40?img=3' }, address: 'Uttara-6', products: 9, orderDate: 'July 31, 2023', price: 530.76, status: 'pending' },
  { _id: '4', userInfo: { name: 'Olga Semklo', avatar: 'https://i.pravatar.cc/40?img=4' }, address: 'Gulshan-1', products: 14, orderDate: 'July 31, 2023', price: 280.57, status: 'cancelled' },
  { _id: '5', userInfo: { name: 'Burak Long', avatar: 'https://i.pravatar.cc/40?img=5' }, address: 'Mirpur-12', products: 10, orderDate: 'July 31, 2023', price: 567.34, status: 'processing' },
];

export const mockProducts: Product[] = [
  { _id: '1', name: 'Moringa', category: 'Medicine', stock: 12, suppliers: 'Square', price: 89.66 },
  { _id: '2', name: 'Antibiotic 250 mg', category: 'Head', stock: 19, suppliers: 'Acme', price: 34.16 },
  { _id: '3', name: 'Headache Relief', category: 'Head', stock: 9, suppliers: 'Beximco', price: 53.76 },
  { _id: '4', name: 'Pharmacy', category: 'Hand', stock: 14, suppliers: 'ACI', price: 28.57 },
  { _id: '5', name: 'Magnesium', category: 'Medicine', stock: 10, suppliers: 'Uniliver', price: 56.34 },
];

export const mockSuppliers: Supplier[] = [
  { _id: '1', name: 'Alex Shatov', address: 'Mripur-1', company: 'Square', deliveryDate: 'August 1, 2023', amount: 6952.53, status: 'active', avatar: 'https://i.pravatar.cc/40?img=1' },
  { _id: '2', name: 'Philip Harbach', address: 'Dhonmondi', company: 'Acme', deliveryDate: 'August 1, 2023', amount: 8527.58, status: 'active', avatar: 'https://i.pravatar.cc/40?img=2' },
  { _id: '3', name: 'Mirko Fisuk', address: 'Uttara-6', company: 'Beximco', deliveryDate: 'August 1, 2023', amount: 2698.50, status: 'active', avatar: 'https://i.pravatar.cc/40?img=3' },
  { _id: '4', name: 'Olga Semklo', address: 'Gulshan-1', company: 'ACI', deliveryDate: 'August 1, 2023', amount: 9852.64, status: 'active', avatar: 'https://i.pravatar.cc/40?img=4' },
  { _id: '5', name: 'Burak Long', address: 'Mirpur-12', company: 'Uniliver', deliveryDate: 'August 1, 2023', amount: 1736.90, status: 'deactive', avatar: 'https://i.pravatar.cc/40?img=5' },
];

export const mockTransactions: Transaction[] = [
  { _id: '1', type: 'expense', title: 'Qonto billing', amount: -49.88 },
  { _id: '2', type: 'income', title: 'Cruip.com Market Ltd 70 Wilson St London', amount: 249.88 },
  { _id: '3', type: 'income', title: 'Notion Labs Inc', amount: 99.99 },
  { _id: '4', type: 'income', title: 'Market Cap Ltd', amount: 1200.88 },
  { _id: '5', type: 'error', title: 'App.com Market Ltd 70 Wilson St London', amount: 99.99 },
  { _id: '6', type: 'expense', title: 'App.com Market Ltd 70 Wilson St London', amount: -49.88 },
];

export const mockDashboard: DashboardData = {
  stats: { products: 8430, suppliers: 211, customers: 140 },
  recentCustomers: mockCustomers,
  transactions: mockTransactions,
};
