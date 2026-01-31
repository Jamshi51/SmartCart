import React, { useEffect, useState } from 'react';
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';
import '../assets/css/orders.css';


function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('http://localhost:8000/api/orders/my_orders/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹{order.total_price}</p>
            <p><b>Date:</b> {new Date(order.created_at).toLocaleDateString()}</p>

            <button onClick={() => navigate(`/orders/${order.id}`)}>
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
