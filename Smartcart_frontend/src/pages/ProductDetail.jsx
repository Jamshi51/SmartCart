import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import "../assets/css/productDetail.css";
import publicApi from "../api/publicAxios";

function ProductDetail() {
  const [cart, setCart] = useState(null);
  const [liked, setLiked] = useState(false);
  const { slug } = useParams();          // ✅ slug
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!slug) return;

    publicApi.get(`products/${slug}/`)
      .then(res => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"));
  }, [slug]);

  
  useEffect(() => {
    api.get("cart/")
      .then(res => setCart(res.data))
      .catch(() => {});
  }, []);


  useEffect(() => {
    if (!product) return;

    api.get("wishlist/")  // fetch all wishlist items
      .then(res => {
        const likedItem = res.data.some(item => item.product === product.id);
        setLiked(likedItem);
      })
      .catch(() => setLiked(false));
  }, [product]);


 const addToCart = async () => {
  try {
    await api.post("cart/add_to_cart/", {
      product: product.id,  
    });


    setCart(prev => ({
      ...prev,
      items: prev?.items
        ? [...prev.items, { product: product.id }]
        : [{ product: product.id }]
    }));
    alert("Product added to cart successfully");
  } catch (err) {
    alert("Failed to add product");
  }
};
   const isInCart = cart?.items?.some(
    item => item.product === product?.id
   );


  
   // toggle wishlist
const toggleWishlist = async () => {
  try {
    const res = await api.post("wishlist/toggle/", {
      product: product.id,   // send product id in POST body
    });
    setLiked(res.data.liked);
    toast.success(res.data.liked ? "Added to wishlist ❤️" : "Removed from wishlist 💔");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update wishlist");
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

        <span
          className={`wishlist-icon ${liked ? "active" : ""}`}
          onClick={toggleWishlist}
        >
          ♥
        </span>
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
          {isInCart ? (
            <button
              className="cart-btn"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>
          ) : (
            <button
              className="cart-btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          )}


          <button className="buy-btn" onClick={buyNow}>
            Buy Now
          </button>

         

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
