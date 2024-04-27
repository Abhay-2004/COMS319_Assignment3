import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDelete = () => {
  const [product, setProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error('Error retrieving product:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/products/${productId}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Delete Product</h2>
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} />
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      {!confirmDelete && (
        <button onClick={() => setConfirmDelete(true)}>Delete</button>
      )}
      {confirmDelete && (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <button onClick={handleDelete}>Confirm Delete</button>
          <button onClick={() => setConfirmDelete(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProductDelete;