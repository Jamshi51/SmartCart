import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/profile.css';

function Profile() {
  const [user, setUser] = useState({});
  const [shippingAddress, setShippingAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    axios.get('http://localhost:8000/api/users/profile/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      setUser(res.data);
      setShippingAddress(res.data.shipping_address || '');
    })
    .catch(err => console.log(err));
  };

  const updateProfile = () => {
    axios.put('http://localhost:8000/api/users/profile/', 
      { 
        first_name: user.first_name, 
        last_name: user.last_name,
        email: user.email,
        password: password,
        shipping_address: shippingAddress
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
    .then(res => {
      setMessage(res.data.message);
      setPassword('');
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      {message && <p style={{color: 'green'}}>{message}</p>}
      <div className="profile-info">
        <input 
          type="text" 
          value={user.first_name || ''} 
          onChange={e => setUser({...user, first_name: e.target.value})} 
          placeholder="First Name"
        />
        <input 
          type="text" 
          value={user.last_name || ''} 
          onChange={e => setUser({...user, last_name: e.target.value})} 
          placeholder="Last Name"
        />
        <input 
          type="email" 
          value={user.email || ''} 
          onChange={e => setUser({...user, email: e.target.value})} 
          placeholder="Email"
        />
        <textarea 
          value={shippingAddress} 
          onChange={e => setShippingAddress(e.target.value)} 
          placeholder="Shipping Address"
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="New Password"
        />
        <button onClick={updateProfile}>Update Profile</button>
      </div>

      <h2>My Orders</h2>
      {user.orders && user.orders.length === 0 && <p>No orders yet.</p>}
      {user.orders && user.orders.map(order => (
        <div key={order.id} className="order-card">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_price}</p>
          <p>Date: {new Date(order.created_at).toLocaleString()}</p>
          <button onClick={() => alert(JSON.stringify(order.items, null, 2))}>
            View Items
          </button>
        </div>
      ))}
    </div>
  );
}

export default Profile;
