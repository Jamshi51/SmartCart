import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

import api from "../api/axios"; // Axios instance
import "../assets/css/home.css";
import { useNavigate } from "react-router-dom";





const Home = () => {
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ref for SHOP NOW button
  const shopNowRef = useRef(null);
useEffect(() => {
  const fetchProducts = async () => {
    if (role === "customer") {  // only customers fetch products
      try {
        const res = await api.get("products/");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err.response?.data);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // sellers & guests skip products
    }
  };

  fetchProducts();
}, [role]);


  const handleExploreMore = () => {
    // Scroll smoothly to SHOP NOW button
    if (shopNowRef.current) {
      shopNowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
   

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h4>WELCOME TO SMARTCART</h4>
          <h1>Make Technology a Part of Your Life</h1>
          <p>
            Discover premium electronics accessories that blend innovation,
            style, and performance.
          </p>
          <button
               
                onClick={() => navigate("/products")}
              >
                SHOP NOW
              </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-container">
        <div className="about-images">
          <img
            src="https://png.pngtree.com/background/20231017/original/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-picture-image_5591437.jpg"
            alt="Fashion"
            className="img-small"
          />
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20251204/pngtree-modern-home-office-setup-with-laptop-and-gadgets-image_20697389.webp"
            alt="Electronics"
            className="img-large"
          />
        </div>

        <div className="about-content">
          <span className="about-tag">ABOUT SMARTCART</span>
          <h2>
            Smart Shopping for <br /> Smart People
          </h2>
          <p>
            SmartCart is a modern, secure, and user-friendly e-commerce platform
            designed to make online shopping faster, easier, and smarter.
            Discover quality products, smart deals, and a seamless shopping
            experience built with real-world industry standards.
          </p>
          <button onClick={() => navigate("/products")} className="about-btn">EXPLORE NOW</button>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
          <section className="products">
            <h2>Latest Products</h2>
            <p>Top trending electronics accessories</p>

            {loading ? (
              <p>Loading products...</p>
            ) : (
              <>
                 <div className="product-grid">
                {products.slice(0, 4).map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>

                    <button
                      className="view-product-btn"
                      onClick={() => navigate("/products")}
                    >
                      View Product
                    </button>
                  </div>
                ))}
              </div>


           
          </>
        )}
      </section>

      
    </>
  );
};

export default Home;

