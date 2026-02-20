import { useContext, useState } from "react";
import AuthContext from "../api/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/home.css";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await registerUser({
      username,
      email,
      password,
      password2,
      role,
    });

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="auth-background" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "500px", padding: "40px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "10px", color: "var(--text-primary)" }}>Create an Account</h2>
        <p style={{ marginBottom: "30px", color: "var(--text-secondary)" }}>Join SmartCart to start shopping smart</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Username</label>
            <input
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ textAlign: "left", flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: "left", flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Confirm</label>
              <input
                type="password"
                placeholder="Confirm"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Account Type</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "15px", width: "100%" }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Already have an account? <span onClick={() => navigate("/login")} style={{ color: "var(--accent-primary)", cursor: "pointer", fontWeight: "600" }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
