import { useState, useEffect } from 'react';
import { customersService } from '../../services/customers.service';
import { Pagination } from '../../components/common/Pagination';
import { IconFilter } from '../../components/icons';
import styles from './CustomersPage.module.css';

interface Customer {
  _id: string;
  photo: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  register_date: string;
}

export const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filterName, setFilterName] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async (name = '', pageNum = 0) => {
    setLoading(true);
    try {
      const data = await customersService.getCustomers({ name, page: pageNum + 1, limit: 10 });
      setCustomers(data.customers);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Customers error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(appliedFilter, page);
  }, [appliedFilter, page]);

  const handleFilter = () => { setAppliedFilter(filterName); setPage(0); };

  return (
    <div className={styles.page}>
      <div className={styles.filterRow}>
        <input
          className={styles.filterInput}
          placeholder="User Name"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleFilter()}
        />
        <button className={styles.filterBtn} onClick={handleFilter}>
          <IconFilter size={14} /> Filter
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Customers Data</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User Info</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Register date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '24px' }}>Loading...</td></tr>
              ) : customers.map(customer => (
                <tr key={customer._id}>
                  <td>
                    <div className={styles.userCell}>
                      {customer.photo
                        ? <img src={customer.photo} alt={customer.name} className={styles.avatar} onError={e => (e.currentTarget.style.display = 'none')} />
                        : <div className={styles.avatarPlaceholder}>{customer.name[0]}</div>
                      }
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td className={styles.emailCell}>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td className={styles.phoneCell}>{customer.phone}</td>
                  <td>{customer.register_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={totalPages} current={page} onChange={setPage} />
      </div>
    </div>
  );
};
