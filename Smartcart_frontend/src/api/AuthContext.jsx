import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const loginUser = async (username, password) => {
    try {
      const res = await api.post("/api/login/", { username, password });

      const access = res.data.access;
      const decoded = jwtDecode(access);

      localStorage.setItem("access_token", access);
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("role", decoded.role);

      setUser({
        username: decoded.username,
        role: decoded.role,
      });

      // 🔁 ROLE BASED REDIRECT
      if (decoded.role === "seller") navigate("/seller");
      else navigate("/"); // customer

    } catch {
      alert("Invalid credentials");
    }
  };
 const registerUser = async (username, email, password, password2, role) => {
  try {
    const response = await api.post("/api/register/", {
      username,
      email,
      password,
      password2,
      role,
    });

    return { success: true, data: response.data };

  } catch (err) {
    console.error(err.response?.data); // 👈 CRITICAL LINE
    return { success: false, error: err.response?.data };
  }
};

 
  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
