import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/css/products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="products-page">
    <h1 className="products-heading">All Products</h1>
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={`http://localhost:8000${product.image}`} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>
            Add to Cart
        </button>

        </div>
      ))}
    </div>
    </div>
  );
}
const addToCart = (productId) => {
  axios.post('http://localhost:8000/cart/add_item/', { product: productId }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` // if using JWT
    }
  })
  .then(res => alert('Added to cart!'))
  .catch(err => console.log(err));
};


export default Products;



