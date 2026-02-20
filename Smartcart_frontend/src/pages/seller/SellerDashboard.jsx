import { useState, useContext } from "react";
import AuthContext from "../../api/AuthContext";
import "../../assets/css/sellerDashboard.css";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const [active, setActive] = useState("dashboard");

  return (
    <div className="dashboard-wrapper">

      {/* 🔵 Header */}
      <div className="topbar">
        <div className="logo">SmartCart</div>

        <div className="top-right">
          <div className="notification">
            🔔
            <span className="badge">3</span>
          </div>

          <div 
            className="profile"
            onClick={() => navigate("/seller/profile")}
          >

            <img
              src={
                user?.profile_pic
                  ? `http://127.0.0.1:8000${user.profile_pic}`
                  : "https://static.vecteezy.com/system/resources/previews/026/966/960/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              alt="profile"
              className="profile-img"
            />
            {user?.username}

            <div className="dropdown">
              <button>Settings</button>
              <button onClick={logoutUser}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-body">

        {/* 🟢 Sidebar */}
        <div className="sidebar">
          <button 
            className={active === "dashboard" ? "active" : ""}
            onClick={() => setActive("dashboard")}
          >
            📊 Dashboard
          </button>

          <button 
            className={active === "products" ? "active" : ""}
            onClick={() => setActive("products")}
          >
            📦 Products
          </button>

          <button 
            className={active === "orders" ? "active" : ""}
            onClick={() => setActive("orders")}
          >
            🛒 Orders
          </button>

          <button 
            className={active === "reports" ? "active" : ""}
            onClick={() => setActive("reports")}
          >
            📈 Reports
          </button>

          <button 
            className={active === "settings" ? "active" : ""}
            onClick={() => setActive("settings")}
          >
            ⚙ Settings
          </button>

          <button className="logout-side" onClick={logoutUser}>
            🚪 Logout
          </button>
        </div>

        {/* 🟡 Main Content */}
        <div className="dashboard-content">

          {/* 💎 Status Cards */}
          <div className="status-cards">
            <div className="card">
              <h3>Total Sales</h3>
              <p>₹ 50,000</p>
            </div>

            <div className="card">
              <h3>New Orders</h3>
              <p>15</p>
            </div>

            <div className="card">
              <h3>Active Products</h3>
              <p>45</p>
            </div>
          </div>

          {/* 📋 Recent Orders */}
          <div className="orders-table">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#101</td>
                  <td>Jamshi</td>
                  <td className="shipped">Shipped</td>
                  <td>₹1200</td>
                </tr>
                <tr>
                  <td>#102</td>
                  <td>Rahul</td>
                  <td className="pending">Pending</td>
                  <td>₹800</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
