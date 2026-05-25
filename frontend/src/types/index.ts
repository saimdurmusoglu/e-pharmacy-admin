export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  register_date: string;
  spent?: string;
  avatar?: string;
  photo?: string;
}

export type OrderStatus = 'completed' | 'confirmed' | 'pending' | 'cancelled' | 'processing' | 'shipped' | 'delivered';

export interface Order {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  price: string;
  status: OrderStatus;
  order_date: string;
}

export type ProductCategory =
  | 'Medicine'
  | 'Head'
  | 'Hand'
  | 'Heart'
  | 'Leg'
  | 'Dental Care'
  | 'Skin Care'
  | 'Eye Care'
  | 'Vitamins & Supplements'
  | 'Orthopedic Products'
  | 'Baby Care';

export interface Product {
  _id: string;
  name: string;
  category: ProductCategory;
  stock: number;
  suppliers: string;
  price: number;
  photo?: string;
}

export type SupplierStatus = 'active' | 'deactive';

export interface Supplier {
  _id: string;
  photo: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: SupplierStatus;
}

export type TransactionType = 'income' | 'expense' | 'error';

export interface Transaction {
  _id: string;
  type: string;
  title?: string;
  name?: string;
  address?: string;
  email?: string;
  amount: string;
}

export interface DashboardData {
  stats: {
    products: number;
    suppliers: number;
    customers: number;
  };
  recentCustomers: Customer[];
  transactions: Transaction[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
