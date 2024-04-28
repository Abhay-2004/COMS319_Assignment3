import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/products/${productId}`);
      setProduct(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Product not found');
      setProduct(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/products/${productId}`);
      setMessage('Product deleted successfully');
      navigate('/'); // Navigate back to the home page after deletion
    } catch (error) {
      setMessage('Failed to delete product');
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <label>
        Enter Product ID:
        <input type="text" value={productId} onChange={handleProductIdChange} />
      </label>
      <button onClick={fetchProduct}>Fetch Product</button>
      
      {product && (
        <div>
          <h3>Product Information</h3>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <p>Rating Rate: {product.rating.rate}</p>
          <p>Rating Count: {product.rating.count}</p>
          <button onClick={handleDelete}>Delete Product</button>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
