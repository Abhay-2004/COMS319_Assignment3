import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ProductUpdate = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    rating: {
      rate: '',
      count: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error retrieving product:', err);
        setError('Failed to fetch product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rating.rate' || name === 'rating.count') {
      setProduct(prevProduct => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/products/${id}`, product);
      alert('Product updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={product.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Rating Rate:</label>
          <input type="number" step="0.1" name="rating.rate" value={product.rating.rate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Rating Count:</label>
          <input type="number" name="rating.count" value={product.rating.count} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-update">Update Product</button>
      </form>
    </div>
  );
};

export default ProductUpdate;
