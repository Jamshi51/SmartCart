import React, { useEffect, useState } from 'react';
import "../assets/css/products.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import publicApi from "../api/publicAxios";
import { useLocation } from "react-router-dom";



function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [location.search, currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const searchParam = params.get("search") || "";
    const categoryParam = params.get("category") || "";

    setSearch(searchParam);
    setCategory(categoryParam);

  }, [location.search]);



  useEffect(() => {
    publicApi.get("products/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const fetchProducts = async () => {
    try {
      const separator = location.search ? "&" : "?";

      const res = await publicApi.get(
        `/products${location.search}${separator}page=${currentPage}`
      );

      console.log("API RESPONSE:", res.data);  // 👈 ADD HERE

      setProducts(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 8));

    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };



  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      navigate("/products"); //  removes query params
    } else {
      navigate(`/products?category=${value}`);
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
    <div className="page-container">
      <main className="main-content">
    <div className="products-page">

      <div className="products-header">
        <h1>Explore Products</h1>

      </div>

      <div className="product--grid">
        {products.length === 0 && (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try adjusting your search or category</p>
          </div>
        )}

        {products.map(product => (
          <div key={product.id} className="product--card">
            <div className="image--container">
              <img
                src={product.image}
                alt={product.name}
              />


            </div>

            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="price">₹{product.price}</p>
              <p className="stock">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              <Link
                to={`/products/${product.slug}`}
                className="product-btn"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          ← Previous
        </button>

        <div className="page-info">
          Page <span>{currentPage}</span> of <span>{totalPages}</span>
        </div>

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next →
        </button>
      </div>


    </div>
    </main>
    </div>
  );

}

export default Products;





