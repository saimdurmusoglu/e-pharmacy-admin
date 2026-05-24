import { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboard.service';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IconAllProducts, IconCustomers, IconSuppliers } from '../../assets/icons';
import type { Customer, Transaction } from '../../types';
import styles from './DashboardPage.module.css';

interface DashboardStats {
  products: number;
  suppliers: number;
  customers: number;
}

export const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({ products: 0, suppliers: 0, customers: 0 });
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getDashboard();
        setStats(data.stats);
        setRecentCustomers(data.recentCustomers);
        setTransactions(data.transactions);
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.active}`}>
          <div className={styles.statHeader}>
            <IconAllProducts size={18} className={styles.statIcon} />
            <span className={styles.statLabel}>All products</span>
          </div>
          <p className={styles.statValue}>{stats.products.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <IconSuppliers size={18} className={styles.statIcon} />
            <span className={styles.statLabel}>All suppliers</span>
          </div>
          <p className={styles.statValue}>{stats.suppliers}</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <IconCustomers size={18} className={styles.statIcon} />
            <span className={styles.statLabel}>All customers</span>
          </div>
          <p className={styles.statValue}>{stats.customers}</p>
        </div>
      </div>

      <div className={styles.tablesGrid}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Recent Customers</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Spent</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map(c => (
                  <tr key={c._id}>
                    <td>
                      <div className={styles.userCell}>
                        {c.avatar || (c as any).photo
                          ? <img src={c.avatar || (c as any).photo} alt={c.name} className={styles.avatar} onError={e => (e.currentTarget.style.display = 'none')} />
                          : <div className={styles.avatarPlaceholder}>{c.name[0]}</div>
                        }
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className={styles.emailCell}>{c.email}</td>
                    <td>{c.spent || (c as any).spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Income/Expenses</h2>
          </div>
          <div className={styles.tableWrap}>
            <p className={styles.todayLabel}>Today</p>
            <div className={styles.transactionList}>
              {transactions.map(t => (
                <div key={t._id} className={styles.transactionRow}>
                  <StatusBadge status={t.type.toLowerCase() as any} variant="filled" />
                  <span className={styles.transactionTitle}>{t.title || (t as any).name}</span>
                  <span className={`${styles.transactionAmount} ${styles[t.type.toLowerCase()]}`}>
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
