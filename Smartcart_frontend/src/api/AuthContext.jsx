import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // user state
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );

  // Axios instance with token
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : null },
  });

  // LOGIN FUNCTION
  const loginUser = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      setAccessToken(access);
      setUser({ username }); // optionally fetch user details from backend

      navigate("/"); // redirect to home
    } catch (err) {
      console.error(err.response.data);
      alert("Login failed! Check username/password.");
    }
  };

  // REGISTER FUNCTION
  const registerUser = async (username, email, password, password2) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
        password2,
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err.response.data);
      alert("Registration failed! Check console for errors.");
    }
  };

  // LOGOUT FUNCTION
  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loginUser, registerUser, logoutUser, axiosInstance }}
    >
      {children}
    </AuthContext.Provider>
  );
};
