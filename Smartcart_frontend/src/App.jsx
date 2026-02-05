import { Routes, Route } from "react-router-dom";
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
import Payment from "./pages/Payment";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/products/"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Products />
              </ProtectedRoute>
            }
          />
         <Route path="/product/:slug" element={<ProductDetail />} />
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
            path="/seller"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
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


