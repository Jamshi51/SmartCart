import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import publicApi from "../api/publicAxios"; // Axios instance
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
    console.log("Fetching products...");

    try {
      const res = await publicApi.get("products/");
      console.log("API SUCCESS:", res);

      setProducts(res.data.results.slice(0, 4));
    } catch (err) {
      console.log("API ERROR:", err);
    } finally {
      console.log("Finished loading");
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
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
          <div className="hero-text">
            <h4>WELCOME TO SMARTCART</h4>
            <h1>Make Technology a Part of Your Life</h1>
            <p>
              Discover premium electronics accessories that blend innovation,
              style, and performance. Shop smart deals on the latest gadgets,
              accessories, and tech essentials.
            </p>
            <button className="btn-primary" onClick={() => navigate("/products")}>
              SHOP NOW
            </button>
          </div>
          
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
          <button onClick={() => navigate("/products")} className="btn-secondary">EXPLORE NOW</button>
        </div>
      </section>
      {/* FEATURES SECTION */}
<section className="features">
  <div className="feature-card">
    <div className="feature-icon">🚚</div>
    <h3>Free Shipping</h3>
    <p>Enjoy free shipping on all orders across India.</p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">🔄</div>
    <h3>Free Returns</h3>
    <p>Easy 7-day return policy for a stress-free experience.</p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">💬</div>
    <h3>24/7 Support</h3>
    <p>Our support team is available anytime you need help.</p>
  </div>
</section>
      {/* PRODUCTS SECTION */}
      <section className="products">
  <h2>Latest Products</h2>
  <p>Top trending electronics accessories</p>

  {loading ? (
    <p>Loading products...</p>
  ) : (
    <div className="products-grid">
  {products.length === 0 ? (
    <p>No products found</p>
  ) : (
    products.map((product) => (
      <div
        className="product-card"
        key={product.id}
        onClick={() => navigate(`/product/${product.slug}`)}
      >
        
              <img
                src={product.image}
                alt={product.name}
              />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
      </div>
    ))
  )}
</div>
     
  )}
</section>
    </>
  );
};
export default Home;
