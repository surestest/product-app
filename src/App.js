// src/App.js
import React, { useState, useMemo } from 'react';
import ProductList from './components/ProductList';
import ProductGrid from './components/ProductGrid';
import ProductForm from './components/ProductForm';
import Pagination from './components/Pagination';
import useDebounce from './components/useDebounce';
import { initialProducts } from './initialProducts';
import './index.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const [isFormVisible, setIsFormVisible] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm) {
      return products;
    }
    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [products, debouncedSearchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleProductSubmit = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === productData.id ? productData : p
      ));
      setEditingProduct(null);
    } else {
      setProducts([...products, productData]);
    }
    setIsFormVisible(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsFormVisible(false);
  };

  return (
    <div className="app-container">
      <h1>Product Management System</h1>
      <hr />

      {!isFormVisible && !editingProduct && (
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setIsFormVisible(true)}
            className="add-product-button"
          >
            ➕ Add New Product
          </button>
        </div>
      )}

      {(isFormVisible || editingProduct) && (
        <>
          <ProductForm
            initialProduct={editingProduct}
            onSubmit={handleProductSubmit}
            onCancel={handleCancelEdit}
          />
          <hr />
        </>
      )}

      <div className="control-panel">
        <div className="search-box">
          <label htmlFor="search">Search by Name:</label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && <small>(Debounced: {debouncedSearchTerm})</small>}
        </div>

        <div className="view-toggle">
          <button
            onClick={() => setView('list')}
            className={view === 'list' ? 'active' : ''}
          >
            List View
          </button>
          <button
            onClick={() => setView('card')}
            className={view === 'card' ? 'active' : ''}
          >
            Card View
          </button>
        </div>
      </div>

      <hr />

      <h2>Products ({filteredProducts.length} Results)</h2>

      {view === 'list' ? (
        <ProductList products={currentProducts} onEdit={handleEdit} />
      ) : (
        <ProductGrid products={currentProducts} onEdit={handleEdit} />
      )}

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
