import { useState, useContext } from "react";
import { AuthContext } from "../api/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await registerUser(
      form.username,
      form.email,
      form.password,
      form.password2,
      form.role
    );

    if (result.success) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert(JSON.stringify(result.error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <input
        type="password"
        name="password2"
        value={form.password2}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="customer">Register as Customer</option>
        <option value="seller">Register as Seller</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
