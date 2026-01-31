import { Routes,Route } from "react-router-dom"
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
 

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
       <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      <Route path="/checkout" 
             element={ 
             <ProtectedRoute>
              <Orders />
            </ProtectedRoute>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/payment/:orderId" element={<Payment />} />
    </Routes>

    </>
  )
}

export default App
