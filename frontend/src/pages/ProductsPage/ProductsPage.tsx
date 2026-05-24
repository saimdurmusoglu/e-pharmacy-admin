import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { productsService } from '../../services/products.service';
import { Modal } from '../../components/common/Modal';
import { Pagination } from '../../components/common/Pagination';
import { IconFilter, IconEdit, IconTrash, IconPlus, IconChevronDown } from '../../assets/icons';
import type { ProductCategory } from '../../types';
import styles from './ProductsPage.module.css';

const CATEGORIES: ProductCategory[] = [
  'Medicine', 'Head', 'Hand', 'Heart', 'Leg', 'Dental Care',
  'Skin Care', 'Eye Care', 'Vitamins & Supplements', 'Orthopedic Products', 'Baby Care'
];

interface Product {
  _id: string;
  photo: string;
  name: string;
  category: string;
  stock: string;
  suppliers: string;
  price: string;
}

const schema = yup.object({
  name: yup.string().required('Required'),
  category: yup.string().required('Required'),
  stock: yup.string().required('Required'),
  suppliers: yup.string().required('Required'),
  price: yup.string().required('Required'),
});

type FormData = { name: string; category: string; stock: string; suppliers: string; price: string; };

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterName, setFilterName] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const addForm = useForm<FormData>({ resolver: yupResolver(schema) });
  const editForm = useForm<FormData>({ resolver: yupResolver(schema) });

  const fetchProducts = async (name = '', pageNum = 0) => {
    setLoading(true);
    try {
      const data = await productsService.getProducts({ name, page: pageNum + 1, limit: 5 });
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Products error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(appliedFilter, page);
  }, [appliedFilter, page]);

  const handleFilter = () => { setAppliedFilter(filterName); setPage(0); };

  const handleAdd = async (data: FormData) => {
    try {
      await productsService.addProduct(data as any);
      setAddOpen(false);
      addForm.reset();
      fetchProducts(appliedFilter, page);
    } catch (err) {
      console.error('Add product error:', err);
    }
  };

  const handleEdit = async (data: FormData) => {
    if (!editProduct) return;
    try {
      await productsService.updateProduct(editProduct._id, data as any);
      setEditProduct(null);
      fetchProducts(appliedFilter, page);
    } catch (err) {
      console.error('Edit product error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productsService.deleteProduct(id);
      fetchProducts(appliedFilter, page);
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    editForm.reset({
      name: product.name,
      category: product.category,
      stock: product.stock,
      suppliers: product.suppliers,
      price: product.price,
    });
  };

  const ProductForm = ({ form, onSubmit, onCancel, submitLabel }: any) => (
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

  return (
    <div className={styles.page}>
      <div className={styles.filterRow}>
        <input
          className={styles.filterInput}
          placeholder="Product Name"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleFilter()}
        />
        <button className={styles.filterBtn} onClick={handleFilter}>
          <IconFilter size={14} /> Filter
        </button>
        <button className={styles.addBtn} onClick={() => setAddOpen(true)}>
          <IconPlus size={16} /> Add a new product
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>All products</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Suppliers</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '24px' }}>Loading...</td></tr>
              ) : products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.suppliers}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openEdit(product)} title="Edit">
                        <IconEdit size={15} />
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(product._id)} title="Delete">
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={totalPages} current={page} onChange={setPage} />
      </div>

      <Modal isOpen={addOpen} onClose={() => { setAddOpen(false); addForm.reset(); }} title="Add a new product">
        <ProductForm form={addForm} onSubmit={handleAdd} onCancel={() => { setAddOpen(false); addForm.reset(); }} submitLabel="Add" />
      </Modal>

      <Modal isOpen={!!editProduct} onClose={() => setEditProduct(null)} title="Edit product">
        <ProductForm form={editForm} onSubmit={handleEdit} onCancel={() => setEditProduct(null)} submitLabel="Save" />
      </Modal>
    </div>
  );
};
