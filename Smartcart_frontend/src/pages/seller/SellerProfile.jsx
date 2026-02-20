import { useContext } from "react";
import AuthContext from "../../api/AuthContext";
import { useEffect, useState } from "react";
import api from "../../api/axios"; // ✅ use api (not privateApi)
import "../../assets/css/sellerprofile.css";
import { useNavigate } from "react-router-dom";


const SellerProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);


  const [formData, setFormData] = useState({
    username: "",          // ✅ ADD THIS
    shop_name: "",
    business_address: "",
    bank_account: "",
    ifsc_code: "",
    });

 

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("seller/profile/");

        setFormData({
        username: res.data.username || "",
        shop_name: res.data.shop_name || "",
        business_address: res.data.business_address || "",
        bank_account: res.data.bank_account || "",
        ifsc_code: res.data.ifsc_code || "",
        });


        if (res.data.profile_image) {
          setPreview(`http://127.0.0.1:8000${res.data.profile_image}`);
        }
      } catch (error) {
        console.error("Update failed:", error.response?.data);
        }

    };

    fetchProfile();
  }, []);

  // ✅ Handle text change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Submit entire form (including image)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("shop_name", formData.shop_name || "");
    data.append("business_address", formData.business_address || "");
    data.append("bank_account", formData.bank_account || "");
    data.append("ifsc_code", formData.ifsc_code || "");

    if (image) {
      data.append("profile_image", image);
    }

    try {
      const res = await api.put("seller/profile/", data);

        alert("Profile updated successfully!");

        // 🔥 UPDATE CONTEXT IMMEDIATELY
        setUser({
          ...user,
          profile_pic: res.data.profile_image
        });

        navigate("/seller-dashboard");


    } catch (error) {
      console.log("BACKEND ERROR:", error.response?.data);
    }
  };



  return (
  <div className="seller-dashboard">
    <div className="dashboard-container">
      
      <div className="profile-card">
        <h2 className="dashboard-title">Seller Profile</h2>

        <form onSubmit={handleSubmit} className="profile-form">
          
          <div className="image-section">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="profile-img"
              />
            ) : (
              <div className="profile-placeholder">
                {formData.username?.charAt(0).toUpperCase()}
              </div>
            )}

            <label className="upload-btn">
              Change Photo
              <input type="file" onChange={handleImageChange} hidden />
            </label>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Shop Name</label>
              <input
                type="text"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Business Address</label>
              <textarea
                name="business_address"
                value={formData.business_address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Bank Account</label>
              <input
                type="text"
                name="bank_account"
                value={formData.bank_account}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
);

};

export default SellerProfile;
