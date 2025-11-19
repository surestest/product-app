
import React from 'react';

// List View (Table Format)
const ProductList = ({ products, onEdit }) => {
  return (
    // Wrapper added for responsiveness: allows horizontal scrolling on smaller screens (mobile)
    <div className="table-responsive-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th className="description-col">Description</th> {/* Class added for responsive hiding */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td> {/* Display price with 2 decimal places */}
              <td>{product.category}</td>
              <td className={product.stock === 0 ? 'out-of-stock' : ''}>{product.stock}</td> {/* Special style if stock is 0 */}
              <td className="description-col">{product.description || '-'}</td>
              <td>
                {/* Edit Button */}
                <button onClick={() => onEdit(product)}>Edit</button>
              </td>
            </tr>
          ))}
          {/* Show message if no products are available */}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
