import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../assets/css/orderDetails.css";


function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/orders/${id}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setOrder(res.data))
    .catch(err => console.log(err));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <p className="order-id">Order ID: #{order.id}</p>
      <p>Status: {order.status}</p>
      <p>Total: ₹{order.total_price}</p>

      <h2>Items</h2>
      {order.items.map(item => (
        <div key={item.id} className="order-item">
          <p>{item.product}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
