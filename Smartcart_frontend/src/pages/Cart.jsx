import { useEffect, useState } from "react";
import api from "../api/axios";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    api.get("cart/")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, []);

  const removeFromCart = async (itemId) => {
    await api.delete(`cart/remove/${itemId}/`);

    // ✅ immediate UI update
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Cart</h2>

      {cart.items.length === 0 && <p>Your cart is empty</p>}

      {cart.items.map(item => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
          <img
            src={`http://127.0.0.1:8000${item.product_image}`}
            alt={item.product_name}
            width="100"
          />

          <p><strong>{item.product_name}</strong></p>
          <p>Price: ₹{item.product_price}</p>
          <p>Qty: {item.quantity}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
