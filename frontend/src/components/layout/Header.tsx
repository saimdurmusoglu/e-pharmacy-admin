import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Icon } from '../icons/Icon';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

const subtitleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/orders': 'All orders',
  '/products': 'All products',
  '/suppliers': 'All suppliers',
  '/customers': 'All customers',
};

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const subtitle = subtitleMap[location.pathname] ?? 'Dashboard';

  const handleLogout = async () => {
  try {
    await authService.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    logout();
    navigate('/login');
  }
};

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Toggle menu">
          <Icon name="menu" size={22} />
        </button>
        <div className={styles.logoWrap} onClick={() => navigate('/dashboard')} role="button" tabIndex={0} aria-label="Go to dashboard">
          <Logo showText={false} />
        </div>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Medicine store</h1>
          <p className={styles.subtitle}>
            <span className={styles.subtitleLink} onClick={() => navigate('/dashboard')}>
              {subtitle}
            </span>
            {' '}|{' '}
            <span className={styles.email}>{user?.email ?? 'vendor@gmail.com'}</span>
          </p>
        </div>
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout} aria-label="Logout">
        <Icon name="logout" size={18} />
      </button>
    </header>
  );
};
