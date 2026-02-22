import "../assets/css/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">

        <div className="footer-section">
          <h2 className="footer-brand">SmartCart</h2>
          <p>Your trusted electronics partner.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 SmartCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;