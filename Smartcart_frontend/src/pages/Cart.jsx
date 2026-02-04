import { useEffect, useState } from "react";
import api from "../api/axios";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    api.get("cart/")
      .then(res => setCart(res.data))
      .catch(err => console.log(err.response?.data || err));
  }, []);

  return (
    <div>
      <h2>My Cart</h2>

      {!cart && <p>Loading...</p>}

      {cart && cart.items.length === 0 && (
        <p>Your cart is empty</p>
      )}

      {cart?.items?.map((item) => (
      <div
        key={item.id}
        style={{ display: "flex", gap: "15px", marginBottom: "20px" }}
      >
        <img
          src={`http://127.0.0.1:8000${item.product_image}`}
          alt={item.product_name}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />

        <div>
          <p><strong>{item.product_name}</strong></p>
          <p>Price: ₹{item.product_price}</p>
          <p>Qty: {item.quantity}</p>
          <p>
            <strong>Total:</strong> ₹{item.product_price * item.quantity}
          </p>
        </div>
      </div>
    ))}

    </div>
  );
}

export default Cart;
