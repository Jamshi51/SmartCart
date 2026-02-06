import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    <div>
      <h2>My Wishlist ❤️</h2>
      
      {items.map(item => (
        <div key={item.id}>
          <img src={`http://127.0.0.1:8000${item.product_image}`} width="100" />
          <p>{item.product_name}</p>
          <p>₹{item.product_price}</p>
          <button
            onClick={() => {
              if (!item.product_slug) return alert("Product slug missing!");
              navigate(`/products/${item.product_slug}`);
            }}
          >
            View Product
          </button>
        </div>
      ))}

      
    </div>
  );
}

export default Wishlist;
