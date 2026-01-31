import React, { useEffect, useState } from 'react';
import "../assets/css/products.css";
import { toast } from "react-toastify";
import api from "../api/axios";   // ✅ import your instance



function Products() {
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
    // Fetch categories dynamically
    api.get("http://127.0.0.1:8000/api/products/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const fetchProducts = () => {
    api.get("http://127.0.0.1:8000/api/products/", {
      params: {
        search: search || undefined,
        category: category || undefined,
        min_price: minPrice || undefined,
        max_price: maxPrice || undefined,
      }
    })
    .then(res => setProducts(res.data))
    .catch(err => console.log(err));
  };

  const addToCart = (productId, stock) => {

  if (!localStorage.getItem("token")) {
    toast.warning("🔐 Please login to add items to cart");
    return;
  }

  if (stock <= 0) {
    toast.error("❌ Out of stock");
    return;
  }

  api.post(
    "http://127.0.0.1:8000/api/cart/add_item/",
    { product: productId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  )
  .then(() => {
    toast.success("🛒 Product added to cart!");
  })
  .catch(() => {
    toast.error("❌ Failed to add product");
  });
};

  return (
    <div className="products-page">
      <h1 className="products-heading">All Products</h1>

      {/* 🔹 FILTER BAR */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

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
            <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product.id, product.stock)}
                  disabled={product.stock === 0} >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>

             
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

 



