import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import "../assets/css/productDetail.css";
import publicApi from "../api/publicAxios";

function ProductDetail() {
  const { slug } = useParams();          // ✅ slug
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!slug) return;

    publicApi.get(`products/${slug}/`)         // ✅ no /api here
      .then(res => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"));
  }, [slug]);                            // ✅ slug dependency

 const addToCart = async () => {
  try {
    await api.post("cart/add_to_cart/", {
      product: product.id,
      quantity: 1,
    });

    alert("Product added to cart successfully");
  } catch (err) {
    alert("Failed to add product");
  }
};
  const buyNow = async () => {
    await addToCart();
    navigate("/checkout");
  };

  const addToWishlist = () => {
    toast.info("Wishlist feature coming soon ❤️");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      {/* IMAGE */}
      <div className="image-section">
      <img src={product.image} alt={product.name} />


      </div>

      {/* INFO */}
      <div className="info-section">
        <h1>{product.name}</h1>
        <p className="category">{product.category?.name}</p>

        <div className="rating">
          ⭐ {product.rating ?? 0} ({product.reviews_count ?? 0} reviews)
        </div>

        <h2 className="price">₹{product.price}</h2>

        <p className="description">{product.description}</p>

        <div className="buttons">
          <button className="cart-btn" onClick={addToCart}>
            Add to Cart
          </button>

          <button className="buy-btn" onClick={buyNow}>
            Buy Now
          </button>

          <button className="wishlist-btn" onClick={addToWishlist}>
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
