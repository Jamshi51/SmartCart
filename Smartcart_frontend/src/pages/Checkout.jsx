import React, { useEffect, useState } from 'react';
import api from "../api/axios";
import '../assets/css/checkout.css';

function Checkout() {
  const [cart, setCart] = useState({ items: [] });
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    api.get('http://localhost:8000/cart/my_cart/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setCart(res.data))
    .catch(err => console.log(err));
  }, []);

  const cartTotal = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const placeOrder = () => {
    api.post('http://localhost:8000/orders/create_order/', 
      { shipping_address: shippingAddress },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
    .then(res => {
      alert(`Order placed! Order ID: ${res.data.order_id}`);
      setCart({ items: [] }); // clear frontend cart
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-summary">
            {cart.items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={`http://localhost:8000${item.product.image}`} alt={item.product.name} />
                <h2>{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.product.price * item.quantity}</p>
              </div>
            ))}
            <h2>Cart Total: ${cartTotal}</h2>
          </div>

          <div className="shipping">
            <h3>Shipping Address</h3>
            <textarea 
              value={shippingAddress} 
              onChange={(e) => setShippingAddress(e.target.value)} 
              placeholder="Enter your shipping address"
            />
          </div>

          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Checkout;

