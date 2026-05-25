import type { UseFormReturn } from 'react-hook-form';
import type { ProductCategory } from '../../types';
import { IconChevronDown } from '../../components/icons';
import styles from './ProductsPage.module.css';

const CATEGORIES: ProductCategory[] = [
  'Medicine', 'Head', 'Hand', 'Heart', 'Leg', 'Dental Care',
  'Skin Care', 'Eye Care', 'Vitamins & Supplements', 'Orthopedic Products', 'Baby Care',
];

export type ProductFormData = {
  name: string;
  category: string;
  stock: string;
  suppliers: string;
  price: string;
};

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  submitLabel: string;
}

export const ProductForm = ({ form, onSubmit, onCancel, submitLabel }: ProductFormProps) => (
  <form className={styles.modalForm} onSubmit={form.handleSubmit(onSubmit)}>
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <input {...form.register('name')} placeholder="Product Info" className={styles.modalInput} />
        {form.formState.errors.name && <span className={styles.err}>{form.formState.errors.name.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <div className={styles.selectWrap}>
          <select {...form.register('category')} className={styles.modalInput}>
            <option value="">Category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <IconChevronDown size={14} className={styles.selectIcon} />
        </div>
      </div>
      <div className={styles.formGroup}>
        <input {...form.register('stock')} placeholder="Stock" className={styles.modalInput} />
      </div>
      <div className={styles.formGroup}>
        <input {...form.register('suppliers')} placeholder="Suppliers" className={styles.modalInput} />
      </div>
      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <input {...form.register('price')} placeholder="Price" className={styles.modalInput} />
      </div>
    </div>
    <div className={styles.modalBtns}>
      <button type="submit" className={styles.saveBtn}>{submitLabel}</button>
      <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
    </div>
  </form>
);
