import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { dashboardService } from '../../services/dashboard.service';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IconDatabase, IconCustomers } from '../../components/icons';
import type { Customer, Transaction, TransactionType } from '../../types';
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

  const tableWrapRef      = useRef<HTMLDivElement>(null);
  const extScrollRef      = useRef<HTMLDivElement>(null);
  const extScrollInnerRef = useRef<HTMLDivElement>(null);
  const isSyncing         = useRef(false);

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

  /* Tablo genişliğini oku ve extScrollInner genişliğini güncelle.
     useLayoutEffect: DOM ölçümü paint'ten önce yapılır → daha güvenilir. */
  useLayoutEffect(() => {
    if (loading) return;
    const wrap = tableWrapRef.current;
    const inner = extScrollInnerRef.current;
    if (!wrap || !inner) return;

    const update = () => { inner.style.width = `${wrap.scrollWidth}px`; };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [loading, recentCustomers]);

  const onTableScroll = useCallback(() => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    if (extScrollRef.current && tableWrapRef.current)
      extScrollRef.current.scrollLeft = tableWrapRef.current.scrollLeft;
    isSyncing.current = false;
  }, []);

  const onExtScroll = useCallback(() => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    if (tableWrapRef.current && extScrollRef.current)
      tableWrapRef.current.scrollLeft = extScrollRef.current.scrollLeft;
    isSyncing.current = false;
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page}>

      {/* ── Stat cards ── */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.active}`}>
          <div className={styles.statHeader}>
            <IconDatabase size={18} className={styles.statIcon} />
            <span className={styles.statLabel}>All products</span>
          </div>
          <p className={styles.statValue}>{stats.products.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <IconDatabase size={18} className={styles.statIcon} />
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

      {/* ── Recent Customers ── */}
      <div className={styles.tablesGrid}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Recent Customers</h2>
          </div>
          <div
            className={styles.tableWrap}
            ref={tableWrapRef}
            onScroll={onTableScroll}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Spent</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Register Date</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map(c => (
                  <tr key={c._id}>
                    <td>
                      <div className={styles.userCell}>
                        {c.avatar || c.photo
                          ? <img src={c.avatar || c.photo} alt={c.name} className={styles.avatar} onError={e => (e.currentTarget.style.display = 'none')} />
                          : <div className={styles.avatarPlaceholder}>{c.name[0]}</div>
                        }
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className={styles.emailCell}>{c.email}</td>
                    <td>{c.spent}</td>
                    <td>{c.address}</td>
                    <td>{c.phone}</td>
                    <td>{c.register_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── External scrollbar (tablesGrid'den 20px aşağıda) ── */}
      <div
        className={styles.extScroll}
        ref={extScrollRef}
        onScroll={onExtScroll}
      >
        <div className={styles.extScrollInner} ref={extScrollInnerRef} />
      </div>

      {/* ── Income / Expenses (scrollbar'dan 40px aşağıda) ── */}
      <div className={styles.incomeCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Income/Expenses</h2>
        </div>
        <div className={styles.tableWrap}>
          <p className={styles.todayLabel}>Today</p>
          <div className={styles.transactionList}>
            {transactions.map(t => {
              const type = t.type.toLowerCase() as TransactionType;
              return (
                <div key={t._id} className={styles.transactionRow}>
                  <StatusBadge status={type} variant="filled" />
                  <span className={styles.transactionTitle}>
                    {[t.title || t.name, t.address].filter(Boolean).join(' ')}
                  </span>
                  <span className={`${styles.transactionAmount} ${styles[type]}`}>
                    {t.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
