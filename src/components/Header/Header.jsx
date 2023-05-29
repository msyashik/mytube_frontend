import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { userInfoContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserInfo("");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="header mt-2">
      <Link className="remove-underline" to="/">
        <h5 className="my-tube-text">MyTube</h5>
      </Link>
      <div className="header-options">
        {!userInfo && (
          <Link className="remove-underline" to="/login">
            <p className="header-links ms-2">Login</p>
          </Link>
        )}
        {!userInfo && (
          <Link className="remove-underline" to="/register">
            <p className="header-links ms-2">Register</p>
          </Link>
        )}
        {userInfo && (
          <Link className="remove-underline" to="/">
            <p className="header-links ms-2">Home</p>
          </Link>
        )}
        {userInfo && (
          <Link className="remove-underline" to="/dashboard">
            <p className="header-links ms-2">Dashboard</p>
          </Link>
        )}
        {userInfo && (
          <p onClick={handleLogout} className="header-links ms-2">
            Logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
