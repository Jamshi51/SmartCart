import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ RESTORE USER ON PAGE REFRESH
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Use jwt_decode here
        setUser({
          user_id: decoded.user_id,
          role: decoded.role || "customer", // fallback if role missing
        });
      } catch (error) {
        localStorage.clear();
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN FUNCTION
  const loginUser = async (username, password) => {
  try {
    const res = await api.post("login/", { username, password });

    console.log("Login response:", res.data); // 🔍 check backend response

    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);

    const decoded = jwtDecode(res.data.access);

    console.log("Decoded token:", decoded); // 🔍 VERY IMPORTANT

    const loggedUser = {
      user_id: decoded.user_id,
      role: decoded.role || "customer",
    };

    console.log("Final user object:", loggedUser); // 🔍

    setUser(loggedUser);

    return loggedUser;

  } catch (error) {
    console.error("Login error:", error.response?.data);
    return null;
  }
};



  // ✅ LOGOUT FUNCTION
  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  // ✅ REGISTER FUNCTION
  const registerUser = async (formData) => {
    try {
      await api.post("register/", formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, registerUser, loginUser, logoutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
