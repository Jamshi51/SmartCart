import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/api/login/", {
      email,
      password
    })
    .then(res => {
      // ✅ Save token
      localStorage.setItem("token", res.data.access);

      alert("Login successful");
      navigate("/products");
    })
    .catch(() => {
      alert("Invalid credentials");
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
