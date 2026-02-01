import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../api/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const role = user?.role;   // safer than localStorage directly

  return (
    <nav style={styles.nav}>
      <h3>SmartCart</h3>

      <div style={styles.links}>
        {/* 🔓 Public */}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

       

        {/* 🧑‍💼 SELLER */}
        {role === "seller" && (
          <>
            <Link to="/seller">Seller Dashboard</Link>
            <Link to="/seller/products">My Products</Link>
          </>
        )}

        {/* 🛒 CUSTOMER */}
        {role === "customer" && (
          <>
            <Link to="/products">Shop</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
          </>
        )}



       
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#111",
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};
