import type { OrderStatus, SupplierStatus, TransactionType } from '../../types';
import styles from './StatusBadge.module.css';

type BadgeVariant = OrderStatus | SupplierStatus | TransactionType;

interface StatusBadgeProps {
  status: BadgeVariant;
  variant?: 'outlined' | 'filled';
}

const labelMap: Record<string, string> = {
  completed: 'Completed',
  confirmed: 'Confirmed',
  pending: 'Pending',
  cancelled: 'Cancelled',
  processing: 'Processing',
  active: 'Active',
  deactive: 'Deactive',
  income: 'Income',
  expense: 'Expense',
  error: 'Error',
};

export const StatusBadge = ({ status, variant = 'outlined' }: StatusBadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[status]} ${styles[variant]}`}>
      {labelMap[status] ?? status}
    </span>
  );
};
