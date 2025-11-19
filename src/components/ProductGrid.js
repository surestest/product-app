// src/components/ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onEdit }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} />
      ))}

      {products.length === 0 && (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
          No products available.
        </p>
      )}
    </div>
  );
};

export default ProductGrid;
