import { useEffect, useState } from "react";
import api from "../api/axios";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
  api.get("cart/my_cart/")
    .then(res => setCart(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>My Cart</h2>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map(item => (
        <div key={item.id}>
          <img
            src={`http://127.0.0.1:8000${item.product_image}`}
            width="80"
          />
          <p>{item.product_name}</p>
          <p>₹{item.product_price}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
