import React from "react";
import "./Auth.scss";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import AuthNavbar from "../AuthNavbar/AuthNavbar";
import ResetPassword from "../ResetPassword/ResetPassword";

const Auth = () => {
  return (
    <div className="auth-container">
      <AuthNavbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default Auth;
