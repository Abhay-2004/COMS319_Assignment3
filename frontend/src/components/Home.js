import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error retrieving products:", err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/products/${productId}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const toggleCardExpansion = (index) => {
    const cardBodyElement = document.querySelector(
      `.card:nth-child(${index + 1}) .card-body`
    );
    if (cardBodyElement) {
      cardBodyElement.classList.toggle("expanded");
    }
  };

  return (
    <div className="container">
      <h2>All Products</h2>
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
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products.map((product, index) => (
          <div
            className="col"
            key={product.id}
            onClick={() => toggleCardExpansion(index)}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <p className="card-text">ID: {product.id}</p>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Rating: {product.rating.rate}</p>
                <div className="btn-group">
                  <Link
                    to={`/update/${product.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Update
                  </Link>
                  <Link
                    to={`/delete/${product.id}`}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
