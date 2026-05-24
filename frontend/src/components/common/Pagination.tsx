import styles from './Pagination.module.css';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ total, current, onChange }: PaginationProps) => {
  if (total <= 1) return null;
  return (
    <div className={styles.pagination}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`${styles.dot} ${i === current ? styles.active : ''}`}
          onClick={() => onChange(i)}
          aria-label={`Page ${i + 1}`}
        />
      ))}
    </div>
  );
};
