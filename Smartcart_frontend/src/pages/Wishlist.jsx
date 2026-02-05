import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch wishlist items
    api.get("wishlist/")
      .then(res => setItems(res.data))
      .catch(() => {
        toast.error("Failed to load wishlist");
        setItems([]);
      });
  }, []);

  if (items.length === 0) {
    return (
      <div>
        <h2>My Wishlist ❤️</h2>
        <p>No items in wishlist</p>
      </div>
    );
  }

  return (
    <div>
      <h2>My Wishlist ❤️</h2>

      {items.map(item => (
        <div key={item.id} style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <img
            src={`http://127.0.0.1:8000${item.product_image}`}
            alt={item.product_name}
            width="100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products/${item.product_slug}`)}
          />
          <div>
            <p>{item.product_name}</p>
            <p>₹{item.product_price}</p>
            <button onClick={() => navigate(`/products/${item.product_slug}`)}>
                View Product
             </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
