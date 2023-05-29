import React from "react";
import "./PrivateRoute.css";
import { useContext } from "react";
import { userInfoContext } from "../../App";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [userInfo, setUserInfo] = useContext(userInfoContext);

  return userInfo ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
