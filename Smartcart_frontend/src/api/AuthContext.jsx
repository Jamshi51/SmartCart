import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 RESTORE USER SAFELY
  useEffect(() => {
    const restoreUser = async () => {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");

      if (!access || !refresh) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(access);
        const now = Date.now() / 1000;

        // ⏰ access token expired
        if (decoded.exp < now) {
          const res = await api.post("token/refresh/", {
            refresh,
          });

          localStorage.setItem("access_token", res.data.access);

          const newDecoded = jwtDecode(res.data.access);

          setUser({
            username: newDecoded.username,
            role: newDecoded.role,
          });
        } else {
          setUser({
            username: decoded.username,
            role: decoded.role,
          });
        }
      } catch {
        localStorage.clear();
      }

      setLoading(false);
    };

    restoreUser();
  }, []);

  // ✅ LOGIN
  const loginUser = async (username, password) => {
    try {
      const res = await api.post("login/", { username, password });

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      const decoded = jwtDecode(res.data.access);

      setUser({
        username: decoded.username,
        role: decoded.role,
      });

      navigate(decoded.role === "seller" ? "/seller" : "/");
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
