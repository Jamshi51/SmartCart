import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/wishlist.css";

function Wishlist() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("wishlist/")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
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
  <div className="wishlist-vertical">
     <h2>My Wishlist ❤️</h2>
  {items.map((item) => (
    <div className="wishlist-item-horizontal" key={item.id}>
      
      <div className="wishlist-image-container">
        <img
          src={`http://127.0.0.1:8000${item.product_image}`}
          alt={item.product_name}
        />
      </div>

      <div className="wishlist-item-content">
        <h3>{item.product_name}</h3>
        <p className="price">₹{item.product_price}</p>

        <button
          className="wishlist-btn"
          onClick={() => {
            if (!item.product_slug) return;
            navigate(`/products/${item.product_slug}`);
          }}
        >
          View Product
        </button>
      </div>

    </div>
  ))}
</div>
);
}

export default Wishlist;