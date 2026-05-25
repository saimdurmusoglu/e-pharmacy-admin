import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { suppliersService } from '../../services/suppliers.service';
import { Modal } from '../../components/common/Modal';
import { Pagination } from '../../components/common/Pagination';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IconFilter, IconEdit } from '../../components/icons';
import type { SupplierStatus } from '../../types';
import { SupplierForm } from './SupplierForm';
import type { SupplierFormData } from './SupplierForm';
import styles from './SuppliersPage.module.css';

interface Supplier {
  _id: string;
  photo: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

const schema = yup.object({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  suppliers: yup.string().required('Required'),
  date: yup.string().required('Required'),
  amount: yup.string().required('Required'),
  status: yup.string().required('Required'),
});

export const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filterName, setFilterName] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);

  const addForm = useForm<SupplierFormData>({ resolver: yupResolver(schema) });
  const editForm = useForm<SupplierFormData>({ resolver: yupResolver(schema) });

  const fetchSuppliers = async (name = '', pageNum = 0) => {
    setLoading(true);
    try {
      const data = await suppliersService.getSuppliers({ name, page: pageNum + 1, limit: 5 });
      setSuppliers(data.suppliers);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Suppliers error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(appliedFilter, page);
  }, [appliedFilter, page]);

  const handleFilter = () => { setAppliedFilter(filterName); setPage(0); };

  const handleAdd = async (data: SupplierFormData) => {
    try {
      await suppliersService.addSupplier({
        name: data.name,
        address: data.address,
        company: data.suppliers,
        deliveryDate: data.date,
        amount: Number(data.amount),
        status: data.status as SupplierStatus,
      });
      setAddOpen(false);
      addForm.reset();
      fetchSuppliers(appliedFilter, page);
    } catch (err) {
      console.error('Add supplier error:', err);
    }
  };

  const handleEdit = async (data: SupplierFormData) => {
    if (!editSupplier) return;
    try {
      await suppliersService.updateSupplier(editSupplier._id, {
        name: data.name,
        address: data.address,
        company: data.suppliers,
        deliveryDate: data.date,
        amount: Number(data.amount),
        status: data.status as SupplierStatus,
      });
      setEditSupplier(null);
      fetchSuppliers(appliedFilter, page);
    } catch (err) {
      console.error('Edit supplier error:', err);
    }
  };

  const openEdit = (supplier: Supplier) => {
    setEditSupplier(supplier);
    editForm.reset({
      name: supplier.name,
      address: supplier.address,
      suppliers: supplier.suppliers,
      date: supplier.date,
      amount: supplier.amount,
      status: supplier.status,
    });
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
        <button className={styles.addBtn} onClick={() => setAddOpen(true)}>
          Add a new suppliers
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>All suppliers</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Suppliers Info</th>
                <th>Address</th>
                <th>Company</th>
                <th>Delivery date</th>
                <th>Ammount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className={styles.loadingRow}><td colSpan={7}>Loading...</td></tr>
              ) : suppliers.map(supplier => (
                <tr key={supplier._id}>
                  <td>
                    <div className={styles.userCell}>
                      {supplier.photo
                        ? <img src={supplier.photo} alt={supplier.name} className={styles.avatar} onError={e => (e.currentTarget.style.display = 'none')} />
                        : <div className={styles.avatarPlaceholder}>{supplier.name[0]}</div>
                      }
                      <span>{supplier.name}</span>
                    </div>
                  </td>
                  <td>{supplier.address}</td>
                  <td>{supplier.suppliers}</td>
                  <td>{supplier.date}</td>
                  <td>{supplier.amount}</td>
                  <td><StatusBadge status={supplier.status.toLowerCase() as SupplierStatus} variant="filled" /></td>
                  <td>
                    <button className={styles.editBtn} onClick={() => openEdit(supplier)}>
                      <IconEdit size={13} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={totalPages} current={page} onChange={setPage} />
      </div>

      <Modal isOpen={addOpen} onClose={() => { setAddOpen(false); addForm.reset(); }} title="Add a new suppliers">
        <SupplierForm form={addForm} onSubmit={handleAdd} onCancel={() => { setAddOpen(false); addForm.reset(); }} submitLabel="Add" />
      </Modal>

      <Modal isOpen={!!editSupplier} onClose={() => setEditSupplier(null)} title="Edit supplier">
        <SupplierForm form={editForm} onSubmit={handleEdit} onCancel={() => setEditSupplier(null)} submitLabel="Save" />
      </Modal>
    </div>
  );
};
