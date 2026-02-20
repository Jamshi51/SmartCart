import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../assets/css/cart.css";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("cart/")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, []);

  const removeFromCart = async (itemId) => {
    await api.delete(`cart/remove/${itemId}/`);

    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;

    await api.patch(`cart/update/${itemId}/`, {
      quantity: newQty
    });

    const res = await api.get("cart/");
    setCart(res.data);
  };


  const calculateTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
  };

  if (!cart) return <p className="loading">Loading...</p>;

  return (
    <div className="cart-wrapper">
      <h2 className="cart-title">My Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-layout">

          {/* LEFT SIDE - ITEMS */}
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item.id} className="cart-card">
                <img
                  src={`http://127.0.0.1:8000${item.product_image}`}
                  alt={item.product_name}
                  className="product-image"
                />

                <div className="product-info">
                  <h3>{item.product_name}</h3>
                  <p className="price">
                    Unit: ₹{item.product_price}
                  </p>

                  <p className="subtotal">
                    ₹{item.product_price * item.quantity}
                  </p>

                  <div className="cart-buttons" style={{ marginTop: "15px" }}>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>

                    <button
                      className="view-btn"
                      onClick={() => navigate(`/products/${item.product_slug}`)}
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* QUANTITY ACTIONS */}
                <div className="quantity-actions">
                  <div className="quantity-box">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items Total:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="summary-total">
              <span>Total:</span>
              <span>₹{calculateTotal()}</span>
            </div>

            <button className="btn-primary checkout-btn" onClick={() => navigate("/products")}>/* Or Checkout */
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
