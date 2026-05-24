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
  registerDate: string;
  spent?: number;
  avatar?: string;
}

export type OrderStatus = 'completed' | 'confirmed' | 'pending' | 'cancelled' | 'processing' | 'shipped' | 'delivered';

export interface Order {
  _id: string;
  userInfo: {
    name: string;
    avatar?: string;
  };
  address: string;
  products: number;
  orderDate: string;
  price: number;
  status: OrderStatus;
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
  name: string;
  address: string;
  company: string;
  deliveryDate: string;
  amount: number;
  status: SupplierStatus;
  avatar?: string;
}

export type TransactionType = 'income' | 'expense' | 'error';

export interface Transaction {
  _id: string;
  type: TransactionType;
  title: string;
  email?: string;
  amount: number;
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
