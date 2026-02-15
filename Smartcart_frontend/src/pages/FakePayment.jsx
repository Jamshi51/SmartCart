import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/payment.css";

function FakePayment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvv)) {
      alert("Please fill all card details");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter UPI ID");
      return;
    }

    // Show success banner
    setSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/profile?tab=myorders");
    }, 2000);
  };

  return (
    <div className="payment-wrapper">

      {/* SUCCESS BANNER AT TOP */}
      {success && (
        <div className="success-top">
          ✅ Payment Successful! Redirecting to My Orders...
        </div>
      )}

      <div className="payment-box">
        <h2 className="payment-title">Secure Payment</h2>

        <div className="payment-methods">
          <button
            className={paymentMethod === "card" ? "active" : ""}
            onClick={() => setPaymentMethod("card")}
          >
            💳 Card
          </button>

          <button
            className={paymentMethod === "upi" ? "active" : ""}
            onClick={() => setPaymentMethod("upi")}
          >
            📱 UPI
          </button>
        </div>

        {paymentMethod === "card" && (
          <div className="payment-form">
            <input
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="row">
              <input
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              <input
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="payment-form">
            <input
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        <button className="pay-button" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default FakePayment;
