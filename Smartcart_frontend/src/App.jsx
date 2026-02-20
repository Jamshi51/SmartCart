import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./api/AuthContext";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Payment from "./pages/FakePayment";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import SellerProfile from "./pages/seller/SellerProfile";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              user?.role === "seller" ? (
                <Navigate to="/seller-dashboard" />
              )  : (
                <Home />
              )
            }
          />


          <Route
            path="/products/"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Products />
              </ProtectedRoute>
            }
          />
         <Route path="/products/:slug" element={<ProductDetail />} />
         <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Wishlist />
              </ProtectedRoute>
            }
          />


          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment-gateway"
            element={
              <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                <Payment />
              </ProtectedRoute>
            }
          />


          <Route
            path="/seller-dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />

           <Route
            path="/seller/profile"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerProfile />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    
    </>
  );
}

export default App;

