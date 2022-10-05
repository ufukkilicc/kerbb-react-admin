import React from "react";
import "./AuthNavbar.scss";
import Logo from "../Logo/Logo";

const AuthNavbar = () => {
  return (
    <div className="auth-navbar-container">
      <div className="auth-navbar-logo-container">
        <Logo />
      </div>
    </div>
  );
};

export default AuthNavbar;
