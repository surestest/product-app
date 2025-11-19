// src/components/ProductList.js

import React from 'react';

const ProductList = ({ products, onEdit }) => {
  // Helper to format date for better readability
  const formatDate = (dateString) => {
    // Check if the string is valid before converting
    if (!dateString) return '-'; 
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
  };

  return (
    <div className="table-responsive-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Active</th> 
            <th>Created Date</th> 
            <th className="tags-col">Tags</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{product.price.toLocaleString('en-IN')}</td> 
              <td>{product.category}</td>
              <td className={product.stock === 0 ? 'out-of-stock' : ''}>{product.stock}</td>
              
              <td>
                <span className={`status-dot ${product.isActive ? 'active' : 'inactive'}`}>
                  {product.isActive ? '✅' : '❌'}
                </span>
              </td>
              {/* Created Date Display */}
              <td>{formatDate(product.createdAt)}</td> 
              {/* Tags Display */}
              <td className="tags-col">
                {product.tags && product.tags.length > 0 ? product.tags.join(', ') : '-'}
              </td>
              
              <td>
                <button onClick={() => onEdit(product)}>Edit</button>
              </td>
            </tr>
          ))}
          {/* Total columns is 8 (including Name, Price, Category, Stock, Active, Date, Tags, Actions) */}
          {products.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;