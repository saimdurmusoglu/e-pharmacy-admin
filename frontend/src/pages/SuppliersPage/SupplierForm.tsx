import type { UseFormReturn } from 'react-hook-form';
import { IconChevronDown, IconCalendar } from '../../components/icons';
import styles from './SuppliersPage.module.css';

export type SupplierFormData = {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
};

interface SupplierFormProps {
  form: UseFormReturn<SupplierFormData>;
  onSubmit: (data: SupplierFormData) => void;
  onCancel: () => void;
  submitLabel: string;
}

export const SupplierForm = ({ form, onSubmit, onCancel, submitLabel }: SupplierFormProps) => (
  <form className={styles.modalForm} onSubmit={form.handleSubmit(onSubmit)}>
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <input {...form.register('name')} placeholder="Suppliers Info" className={styles.modalInput} />
      </div>
      <div className={styles.formGroup}>
        <input {...form.register('address')} placeholder="Address" className={styles.modalInput} />
      </div>
      <div className={styles.formGroup}>
        <input {...form.register('suppliers')} placeholder="Company" className={styles.modalInput} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.inputIconWrap}>
          <input {...form.register('date')} placeholder="Delivery date" className={styles.modalInput} />
          <IconCalendar size={14} className={styles.inputIcon} />
        </div>
      </div>
      <div className={styles.formGroup}>
        <input {...form.register('amount')} placeholder="Amount" className={styles.modalInput} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.selectWrap}>
          <select {...form.register('status')} className={styles.modalInput}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
          <IconChevronDown size={14} className={styles.selectIcon} />
        </div>
      </div>
    </div>
    <div className={styles.modalBtns}>
      <button type="submit" className={styles.saveBtn}>{submitLabel}</button>
      <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
    </div>
  </form>
);
