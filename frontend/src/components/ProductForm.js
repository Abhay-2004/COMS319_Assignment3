import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: '',
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rating.rate' || name === 'rating.count') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending product data to server:", product);
      const response = await axios.post('http://localhost:8081/products', product);
      console.log("Product created successfully:", response.data);
      navigate('/'); // Navigate to the home page after successful submission
    } catch (err) {
      console.error('Error creating product:', err.response ? err.response.data.error : err.message);
    }
  };
  

  return (
    <div className="container">
      <h2>Create Product</h2>
      <div className="mb-3">
        <Link to="/" className="btn btn-primary mr-2">
          Home
        </Link>
        <Link to="/create" className="btn btn-primary mr-2">
          Add Product
        </Link>
        <Link to="/info" className="btn btn-primary">
          Student Information
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Rating Rate
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            id="rate"
            name="rating.rate"
            value={product.rating.rate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="count" className="form-label">
            Rating Count
          </label>
          <input
            type="number"
            className="form-control"
            id="count"
            name="rating.count"
            value={product.rating.count}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default ProductForm;