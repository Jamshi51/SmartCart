import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../api/AuthContext";
import "../assets/css/navbar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);

  const token = localStorage.getItem("access_token");

  return (
    <nav className="navbar">
      {/* LEFT SIDE */}
      <Link to="/">SmartCart</Link>

      {/* RIGHT SIDE */}
      <div className="nav-links">

        {/* 🔓 NOT LOGGED IN */}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* 🔐 LOGGED IN */}
        {token && (
          <>
            {/* CUSTOMER */}
           {user && user.role === "customer" && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
            <Link
                to="/wishlist"
                style={{
                  textDecoration: "none",
                  color: "red",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                ❤️ 
              </Link>
          </>
           )}

            {/* SELLER */}
            {user?.role === "seller" && (
              <Link to="/seller">Seller Dashboard</Link>
            )}

            <button onClick={logoutUser}>Logout</button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;

