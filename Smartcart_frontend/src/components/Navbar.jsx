import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../api/AuthContext";
import publicApi from "../api/publicAxios";
import {
  ShoppingCart,
  User,
  Heart,
  Search,
  Menu,
  X,
  LogOut,
  Package,
  LogIn,
  UserPlus
} from "lucide-react";
import "../assets/css/navbar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide Navbar for seller dashboard
  if (user?.role === "seller") {
    return null;
  }

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories (can be used for adv search later)
  useEffect(() => {
    publicApi.get("products/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  // Sync search state with URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get("search") || "");
    setSelectedCategory(params.get("category") || "");
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) {
      params.append("search", search.trim());
    }
    if (selectedCategory) {
      params.append("category", selectedCategory);
    }
    const queryString = params.toString();
    navigate(`/products${queryString ? `?${queryString}` : ""}`);
    if (window.innerWidth <= 850) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* BRAND */}
      <Link to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
        <div className="brand-inner">
          <ShoppingCart className="brand-icon" size={28} strokeWidth={2.5} />
          <span className="brand-text">SmartCart</span>
        </div>
      </Link>

      {/* DESKTOP SEARCH BAR */}
      {user?.role !== "seller" && (
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search amazing products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <Search size={20} />
          </button>
        </form>
      )}

      {/* HAMBURGER TOGGLE */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} color="var(--text-primary)" /> : <Menu size={26} color="var(--text-primary)" />}
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        {/* MOBILE SEARCH (Visible only on small screens) */}
        {user?.role !== "seller" && (
          <form className="nav-search mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <Search size={20} />
            </button>
          </form>
        )}

        {/* UNAUTHENTICATED LINKS */}
        {!user && (
          <div className="auth-group">
            <Link to="/login" className="nav-item login-btn" onClick={() => setMenuOpen(false)}>
              <LogIn size={18} /> Login
            </Link>
            <Link to="/register" className="nav-item register-btn" onClick={() => setMenuOpen(false)}>
              <UserPlus size={18} /> Register
            </Link>
          </div>
        )}

        {/* AUTHENTICATED LINKS */}
        {user && (
          <>
            {user.role === "customer" && (
              <>
                <Link to="/products" className="nav-item" onClick={() => setMenuOpen(false)}>
                  <Package size={18} /> Products
                </Link>
                <Link to="/cart" className="nav-item" onClick={() => setMenuOpen(false)}>
                  <ShoppingCart size={18} /> Cart
                </Link>
                <Link to="/wishlist" className="nav-item" onClick={() => setMenuOpen(false)}>
                  <Heart size={18} /> Wishlist
                </Link>
                <Link to="/profile" className="nav-item" onClick={() => setMenuOpen(false)}>
                  <User size={18} /> Profile
                </Link>
              </>
            )}

            <div className="auth-group">
              <button className="nav-item logout-btn" onClick={() => { logoutUser(); setMenuOpen(false); }}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;