import { NavLink } from 'react-router-dom';
import { Icon } from '../icons/Icon';
import { useAuth } from '../../hooks/useAuth';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/dashboard', icon: 'dashboard' as const, label: 'Dashboard' },
  { path: '/orders',    icon: 'orders'    as const, label: 'Orders' },
  { path: '/products',  icon: 'products'  as const, label: 'Products' },
  { path: '/suppliers', icon: 'suppliers' as const, label: 'Suppliers' },
  { path: '/customers', icon: 'customers' as const, label: 'Customers' },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout } = useAuth();

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
          <Icon name="x" size={16} />
        </button>
        <nav className={styles.nav}>
          {navItems.map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={onClose}
              title={label}
            >
              <span className={styles.iconWrap}>
                <Icon name={icon} size={16} />
              </span>
              <span className={styles.label}>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.footer}>
          <button
            className={styles.logoutBtn}
            onClick={() => { logout(); onClose(); }}
            title="Logout"
            aria-label="Logout"
          >
            <Icon name="logout" size={16} />
          </button>
        </div>
      </aside>
    </>
  );
};
