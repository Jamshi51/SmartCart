import { useState, useContext } from "react";
import { AuthContext } from "../api/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Client-side validation
    if (password !== password2) {
      toast.error("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    const result = await registerUser(
      username,
      email,
      password,
      password2
    );

    setLoading(false);

    if (result?.success) {
      toast.success("🎉 Registration successful!");
      navigate("/login"); // redirect to login
    } else {
      toast.error(
        result?.error?.detail ||
        "❌ Registration failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
