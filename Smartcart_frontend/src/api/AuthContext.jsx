import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 RESTORE USER ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (token && role && username) {
      setUser({ username, role });
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const loginUser = async (username, password) => {
    try {
      const res = await api.post("login/", { username, password });
      const access = res.data.access;
      const decoded = jwtDecode(access);

      localStorage.setItem("access_token", access);
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("role", decoded.role);

      setUser({
        username: decoded.username,
        role: decoded.role,
      });

      if (decoded.role === "seller") navigate("/seller");
      else navigate("/");

    } catch {
      alert("Invalid credentials");
    }
  };

  // 🚪 LOGOUT
  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
