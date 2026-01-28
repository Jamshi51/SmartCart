import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/cart.css'; // reuse your CSS or create cart-specific CSS

function Cart() {
  const [cart, setCart] = useState({ items: [] });

  // Fetch cart items
  const fetchCart = () => {
    axios.get('http://localhost:8000/cart/my_cart/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setCart(res.data))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    axios.post('http://localhost:8000/cart/update_cart_item/', { product: productId, quantity }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(() => fetchCart())
    .catch(err => console.log(err));
  };

  // Remove item
  const removeItem = (productId) => {
    axios.post('http://localhost:8000/cart/remove_from_cart/', { product: productId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(() => fetchCart())
    .catch(err => console.log(err));
  };

  // Calculate total price of cart
  const cartTotal = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1>My Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={`http://localhost:8000${item.product.image}`} alt={item.product.name} />
              <h2>{item.product.name}</h2>
              <p>Price per unit: ${item.product.price}</p>
              <p>
                Quantity: 
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
              </p>
              <p>Total: ${item.product.price * item.quantity}</p>
              <button onClick={() => removeItem(item.product.id)}>Remove</button>
            </div>
          ))}

          <h2>Cart Total: ${cartTotal}</h2>
          <button>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;


