import React, { useEffect, useState } from 'react';
import "../assets/css/products.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import publicApi from "../api/publicAxios";



function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
  fetchProducts();
}, [search, category, minPrice, maxPrice]);

useEffect(() => {
  publicApi.get("products/categories/")
    .then(res => setCategories(res.data))
    .catch(err => console.log(err));
}, []);

const fetchProducts = async () => {
  try {
    const res = await publicApi.get("/products/");
    setProducts(res.data);
  } catch (err) {
    console.error("Failed to fetch products", err);
  }
};

const fetchCategories = async () => {
  try {
    const res = await publicApi.get("products/categories/");
    setCategories(res.data);
  } catch (err) {
    console.error("Failed to fetch categories", err);
  }
};


  

  return (
    <div className="products-page">
      <h1 className="products-heading">All Products</h1>

     

      {/* 🔹 PRODUCT GRID */}
      <div className="product-grid">
        {products.length === 0 && <p>No products found</p>}
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={`http://localhost:8000${product.image}`} alt={product.name} />
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>
            <Link to={`/products/${product.slug}`} className="product-card-btn">
              VIEW DETAIL
            </Link>
             
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

 



