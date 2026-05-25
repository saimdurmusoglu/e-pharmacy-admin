import api from './api';

interface CustomersParams {
  name?: string;
  page?: number;
  limit?: number;
}

interface CustomerPayload {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  register_date?: string;
  photo?: string;
}

export const customersService = {
  getCustomers: async (params: CustomersParams = {}) => {
    const { data } = await api.get('/customers', { params });
    return data; // { customers, total, page, totalPages }
  },

  getCustomerById: async (customerId: string) => {
    const { data } = await api.get(`/customers/${customerId}`);
    return data;
  },

  updateCustomer: async (customerId: string, payload: CustomerPayload) => {
    const { data } = await api.put(`/customers/${customerId}`, payload);
    return data;
  },
};
