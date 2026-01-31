import { createContext, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  // LOGIN
  const loginUser = async (username, password) => {
    try {
      const response = await api.post("/api/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      setAccessToken(access);
      setUser({ username });

      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      alert("Login failed");
    }
  };

  // REGISTER
  const registerUser = async (username, email, password, password2) => {
    try {
      const response = await api.post("/api/register/", {
        username,
        email,
        password,
        password2,
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(error.response?.data);
      return { success: false, error: error.response?.data };
    }
  };

  // LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
