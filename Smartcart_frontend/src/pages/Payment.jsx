import React from "react";
import api from "../api/axios";   // ✅ import your instance

import { useParams, useNavigate } from "react-router-dom";

function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const confirmPayment = async () => {
    try {
      await api.post(
        `http://localhost:8000/api/orders/payment-success/${orderId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Payment successful!");
      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <p>Order ID: {orderId}</p>

      {/* Fake payment button */}
      <button onClick={confirmPayment}>
        Pay Now
      </button>
    </div>
  );
}
const confirmPayment = async () => {
  await api.post(
    `http://localhost:8000/api/orders/payment-success/${orderId}/`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  navigate("/orders");
};
<button onClick={confirmPayment}>
  Place Order & Pay
</button>


export default Payment;
