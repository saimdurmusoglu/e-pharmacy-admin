import { useState, useEffect } from 'react';
import { ordersService } from '../../services/orders.service';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { IconFilter } from '../../assets/icons';
import type { OrderStatus } from '../../types';
import styles from './OrdersPage.module.css';

interface Order {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  price: string;
  status: string;
  order_date: string;
}

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterName, setFilterName] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (name = '', pageNum = 0) => {
    setLoading(true);
    try {
      const data = await ordersService.getOrders({ name, page: pageNum + 1, limit: 5 });
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(appliedFilter, page);
  }, [appliedFilter, page]);

  const handleFilter = () => {
    setAppliedFilter(filterName);
    setPage(0);
  };

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
          <h2 className={styles.tableTitle}>All orders</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User Info</th>
                <th>Address</th>
                <th>Products</th>
                <th>Order date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '24px' }}>Loading...</td></tr>
              ) : orders.map(order => (
                <tr key={order._id}>
                  <td>
                    <div className={styles.userCell}>
                      {order.photo
                        ? <img src={order.photo} alt={order.name} className={styles.avatar} onError={e => (e.currentTarget.style.display = 'none')} />
                        : <div className={styles.avatarPlaceholder}>{order.name[0]}</div>
                      }
                      <span>{order.name}</span>
                    </div>
                  </td>
                  <td>{order.address}</td>
                  <td>{order.products}</td>
                  <td>{order.order_date}</td>
                  <td>{order.price}</td>
                  <td>
                    <StatusBadge status={order.status.toLowerCase() as OrderStatus} variant="outlined" />
                  </td>
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
