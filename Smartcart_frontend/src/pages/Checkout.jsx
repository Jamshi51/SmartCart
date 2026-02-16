import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/checkout.css";
import { toast } from "react-toastify";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [profile, setProfile] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [quantity, setQuantity] = useState(1);

  // ✅ Calculate total dynamically
  const totalPrice = product ? (product.price * quantity).toFixed(2) : 0;


  useEffect(() => {
    api.get("profile/").then(res => {
      const data = res.data;
      setProfile({
        name: data.full_name,
        shipping_address: `${data.address_line}, ${data.city}, ${data.state} - ${data.postal_code}`
      });
    });
  }, []);

  const handlePlaceOrder = async () => {
    try {
      await api.post("orders/create/", {
        product: product.id,
        quantity: quantity,
        payment_method: paymentMethod,
        shipping_address: profile.shipping_address
      });

      toast.success("Order placed successfully!");

      if (paymentMethod === "ONLINE") {
        navigate("/payment-gateway");
      } else {
        navigate("/profile");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  if (!product) return <p>No product selected</p>;

  return (
    <div className="checkout-container">

      {/* LEFT SIDE FORM */}
      <div className="checkout-left">

        <h2>Shipping Details</h2>

        <input
          type="text"
          value={profile.name || ""}
          readOnly
        />

        <textarea
          value={profile.shipping_address || ""}
          readOnly
        />

        {/* PAYMENT SECTION */}
        <div className="payment-section">
          <h3>Select Payment Method</h3>

          <label className="payment-card">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            <div className="payment-content">
              <div className="payment-icon">💵</div>
              <div>
                <div className="payment-title">Cash on Delivery</div>
                <div className="payment-sub">Pay when product is delivered</div>
              </div>
            </div>
          </label>

          <label className="payment-card">
            <input
              type="radio"
              name="payment"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={() => setPaymentMethod("ONLINE")}
            />
            <div className="payment-content">
              <div className="payment-icon">💳</div>
              <div>
                <div className="payment-title">Online Payment</div>
                <div className="payment-sub">UPI, Card, Net Banking</div>
              </div>
            </div>
          </label>
        </div>

        {/* TOTAL SECTION */}
        <div className="checkout-bottom">
          <div className="bottom-total">
            Total: ₹{totalPrice}
          </div>

          <button onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

      </div>

      {/* RIGHT SIDE PRODUCT CARD */}
      <div className="checkout-right">

        <div className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>

          <p>Unit Price: ₹{product.price}</p>

          {/* ✅ Quantity Controls */}
          <div className="quantity-box">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <p className="product-total">
            Subtotal: ₹{totalPrice}
          </p>

          <p>{product.description}</p>
        </div>

      </div>

    </div>
  );
}

export default Checkout;
