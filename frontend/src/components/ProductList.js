import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error retrieving products:', err);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/products/${id}`);
      setSelectedProduct(response.data);
    } catch (err) {
      console.error('Error retrieving product:', err);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <Link to={`/update/${product._id}`}>Update</Link>
            <Link to={`/delete/${product._id}`}>Delete</Link>
            <button onClick={() => fetchProductById(product._id)}>
              View Details
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div>
          <h3>Selected Product</h3>
          <h4>{selectedProduct.title}</h4>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <p>Price: ${selectedProduct.price}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>Category: {selectedProduct.category}</p>
          <p>Rating: {selectedProduct.rating.rate}</p>
          <p>Count: {selectedProduct.rating.count}</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;