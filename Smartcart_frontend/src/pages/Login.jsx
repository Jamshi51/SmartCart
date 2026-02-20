import { useContext, useState } from "react";
import AuthContext from "../api/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/auth.css";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await loginUser(username, password);

    if (user) {
      if (user.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/");
      }
    }
  };


  return (
    <div className="auth-background" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "450px", padding: "40px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "10px", color: "var(--text-primary)" }}>Welcome Back</h2>
        <p style={{ marginBottom: "30px", color: "var(--text-secondary)" }}>Sign in to continue to SmartCart</p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Username</label>
            <input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "10px", width: "100%" }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Don't have an account? <span onClick={() => navigate("/register")} style={{ color: "var(--accent-primary)", cursor: "pointer", fontWeight: "600" }}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
