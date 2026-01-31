import { toast } from "react-toastify";

function ProductCard({ product }) {

  const addToCart = () => {
    try {
      // TODO: add cart logic later
      toast.success("🛒 Product added to cart!");
    } catch (error) {
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
