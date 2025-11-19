// src/components/ProductForm.js - Updated to include createdAt, isActive, and tags

import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialProduct, onSubmit, onCancel }) => {
  // Initialize form data with new fields, ensuring default values for new products
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    // New fields: Convert tags array to comma-separated string for input
    tags: initialProduct?.tags ? initialProduct.tags.join(', ') : '',
    isActive: initialProduct?.isActive !== undefined ? initialProduct.isActive : true, // Default to true
    // createdAt is usually handled by the backend, but we initialize it here
    createdAt: initialProduct?.createdAt || new Date().toISOString(),
    ...initialProduct, 
    // Re-set tags after spread to ensure string format for the input field
    tags: initialProduct?.tags ? initialProduct.tags.join(', ') : '',
  });

  const [errors, setErrors] = useState({});

  // Effect to re-populate form when editingProduct changes
  useEffect(() => {
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      description: '',
      tags: '',
      isActive: true,
      createdAt: new Date().toISOString(),
      ...initialProduct,
      tags: initialProduct?.tags ? initialProduct.tags.join(', ') : '',
    });
    setErrors({});
  }, [initialProduct]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    
    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'price' || name === 'stock') {
      newValue = parseFloat(value);
    } else {
      newValue = value;
    }
    
    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: '' });
  };

  // Validation logic (omitted for brevity, assume original validation is present)
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Product name is required.';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) newErrors.price = 'Price is required & must be a positive number.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (formData.stock && isNaN(formData.stock) || formData.stock < 0) newErrors.stock = 'Stock must be a non-negative number.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Prepare data for submission: convert tags string back to array
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];

      onSubmit({
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        tags: tagsArray,
        id: formData.id || Date.now(),
        // Ensure createdAt is retained or set for new products
        createdAt: formData.createdAt, 
        isActive: formData.isActive,
      });
      setFormData({ name: '', price: '', category: '', stock: '', description: '', tags: '', isActive: true, createdAt: new Date().toISOString() });
    }
  };

  return (
    <div className="form-container">
      <h3>{initialProduct ? 'Edit Product' : 'Add New Product'}</h3>
      <form onSubmit={handleSubmit}>
        {/* Name, Price, Category, Stock, Description fields (Same as before) */}
        <div><label>Name:</label><input type="text" name="name" value={formData.name} onChange={handleChange} required />{errors.name && <p className="error">{errors.name}</p>}</div>
        <div><label>Price:</label><input type="number" name="price" value={formData.price} onChange={handleChange} required min="0.01" step="0.01" />{errors.price && <p className="error">{errors.price}</p>}</div>
        <div><label>Category:</label><input type="text" name="category" value={formData.category} onChange={handleChange} required />{errors.category && <p className="error">{errors.category}</p>}</div>
        <div><label>Stock:</label><input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" />{errors.stock && <p className="error">{errors.stock}</p>}</div>
        <div><label>Description (Optional):</label><textarea name="description" value={formData.description} onChange={handleChange} /></div>

        {/* --- New Fields in Form --- */}
        <div>
          <label>Tags (Comma Separated):</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., electronic, wireless, portable" />
        </div>

        <div>
          <label>Created At (Read-Only):</label>
          <input type="text" name="createdAt" value={new Date(formData.createdAt).toLocaleString()} readOnly />
        </div>

        <div className="checkbox-field">
          <label>Is Active:</label>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} style={{ width: 'auto', display: 'inline-block', marginLeft: '10px' }} />
        </div>
        {/* --- End New Fields --- */}

        <div className="form-buttons">
          <button type="submit">{initialProduct ? 'Save Changes' : 'Add Product'}</button>
          <button type="button" onClick={onCancel} className="cancel-button">
            {initialProduct ? 'Cancel Edit' : 'Close Form'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;