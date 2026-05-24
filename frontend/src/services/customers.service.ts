import api from './api';

interface CustomersParams {
  name?: string;
  page?: number;
  limit?: number;
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
};
