import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

import {API_BASE_URL} from "../config/api";

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return user;
}

export const AuthProvider = ({ children }) => {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser ? decodedUser.data: null));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${API_BASE_URL}/login/refresh/`, loginData);
      localStorage.setItem("token", JSON.stringify(response.data.access));
      setToken(JSON.parse(localStorage.getItem("token")));
      let loggedInUser = jwtDecode(response.data.access);
      setUser(loggedInUser);
      setIsServerError(false);
      navigate("/");

    } catch (error) {
      console.error(error.response.data);
      setIsServerError(true);
      navigate("/register");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
