import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get("profile/");
    setProfile(res.data);
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("orders/user-orders/"); // ✅ updated URL
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err.response?.data || err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (key !== "image" && profile[key] !== null) formData.append(key, profile[key]);
      });
      if (image) formData.append("image", image);
      await api.patch("profile/", formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchProfile();
      setEditMode(false);
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const calculateCompletion = () => {
    const fields = [
      profile.full_name,
      profile.email,
      profile.phone,
      profile.address_line,
      profile.city,
      profile.state,
      profile.postal_code,
      profile.country,
      profile.image,
    ];
    const filled = fields.filter(f => f && f !== "").length;
    return Math.round((filled / fields.length) * 100);
  };

  const completion = calculateCompletion();

  return (
    <div className="profile-page-container">
      {/* LEFT: PROFILE */}
      <div className="profile-left">
        <div className="profile-card">
          <div className="profile-header">
            <img src={preview || (profile.image ? `http://127.0.0.1:8000${profile.image}` : "https://img.freepik.com/free-icon/user_318-804790.jpg")} alt="profile" />
            {editMode && <input type="file" onChange={e => { setImage(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }} />}
            <h2>{profile.full_name || profile.username}</h2>
            <p>{profile.email}</p>
            <div className="completion-bar">
              <div className="completion-fill" style={{ width: `${completion}%` }}></div>
            </div>
            <p>{completion}% Profile Completed</p>
            <button onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel" : "Edit Profile"}</button>
          </div>

          {editMode ? (
            <div className="profile-body">
              <input name="full_name" value={profile.full_name || ""} onChange={e => setProfile({ ...profile, full_name: e.target.value })} placeholder="Full Name" />
              <input name="phone" value={profile.phone || ""} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="Mobile Number" />
              <input name="address_line" value={profile.address_line || ""} onChange={e => setProfile({ ...profile, address_line: e.target.value })} placeholder="Address Line" />
              <input name="city" value={profile.city || ""} onChange={e => setProfile({ ...profile, city: e.target.value })} placeholder="City" />
              <input name="state" value={profile.state || ""} onChange={e => setProfile({ ...profile, state: e.target.value })} placeholder="State" />
              <input name="postal_code" value={profile.postal_code || ""} onChange={e => setProfile({ ...profile, postal_code: e.target.value })} placeholder="Postal Code" />
              <input name="country" value={profile.country || ""} onChange={e => setProfile({ ...profile, country: e.target.value })} placeholder="Country" />
              <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
            </div>
          ) : null}
        </div>
      </div>

      {/* RIGHT: ORDERS */}
      <div className="profile-right">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order, index) => (
                <div key={`${order.id}-${index}`} className="order-card">
                <img
                  src={
                    order.product?.image
                      ? `http://127.0.0.1:8000${order.product.image.startsWith('/') ? '' : '/'}${order.product.image}`
                      : "https://th.bing.com/th/id/OIP.OH5buYFNo81LnhZt6i8OJQHaFO?w=241&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3"
                  }
                  alt={order.product?.name || "Product"}
                />

                <h4>{order.product?.name || "Unnamed Product"}</h4>
                <p>₹{order.total_amount}</p>
                <p>Payment: {order.payment_method}</p>
                <p>{new Date(order.created_at).toLocaleDateString()}</p>
                <p>Shipping: {order.shipping_address}</p>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default Profile;
