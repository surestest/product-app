

import React from 'react';

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <p><strong>Price:</strong> ₹{product.price.toLocaleString('en-IN')}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p className={product.stock === 0 ? 'out-of-stock' : ''}>
        <strong>Stock:</strong> {product.stock}
      </p>
      <p>
        <strong>Status:</strong> 
        <span className={`status-dot ${product.isActive ? 'active' : 'inactive'}`} style={{ marginLeft: '5px' }}>
          {product.isActive ? 'Active' : 'Inactive'}
        </span>
      </p>
      <p className="tags-short">
        <strong>Tags:</strong> {product.tags && product.tags.slice(0, 2).join(', ') + (product.tags.length > 2 ? '...' : '')}
      </p>
      <p className="description-short">{product.description || 'No description.'}</p>
      <button onClick={() => onEdit(product)}>Edit</button>
    </div>
  );
};

export default ProductCard;
