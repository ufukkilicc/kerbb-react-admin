import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import InputIcon from "@mui/icons-material/Input";
import { authLogin, authResetPassword } from "../../features/auth/authAPI";
import { authenticate, isAuth } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import { Helmet } from "react-helmet";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const search = useLocation().search;
  const navigate = useNavigate();
  const resetPasswordToken = new URLSearchParams(search).get(
    "resetPasswordToken"
  );
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [inputPasswordRetypeValue, setInputPasswordRetypeValue] = useState("");
  const [loadingReset, setloadingReset] = useState(false);
  const [errorPasswordRetype, setErrorPasswordRetype] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    SetPageTitle();
    if (isAuth()) {
      navigate("/dashboard");
    }
  }, []);
  const SetPageTitle = () => {
    let title = "";
    window.location.pathname
      .split("/")
      .slice(2)
      .forEach((el) => {
        title += `/${el.charAt(0).toUpperCase() + el.slice(1)}`;
      });
    setPageTitle(title);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputPasswordValue.length === 0 ||
      inputPasswordRetypeValue.length === 0
    ) {
      if (inputPasswordValue.length === 0) {
        setErrorPassword(true);
        alertify.error("Inputs can't be empty");
      } else if (inputPasswordRetypeValue.length === 0) {
        setErrorPasswordRetype(true);
        alertify.error("Inputs can't be empty");
      } else {
        setErrorPassword(true);
        setErrorPasswordRetype(true);
        alertify.error("Inputs can't be empty");
      }
    } else if (inputPasswordValue !== inputPasswordRetypeValue) {
      setErrorPassword(true);
      setErrorPasswordRetype(true);
      alertify.error("Inputs must be equals");
    } else {
      const reset_password = inputPasswordValue;
      const reset_password_retype = inputPasswordRetypeValue;
      const body = { reset_password, reset_password_retype };
      setloadingReset(true);
      const response = await authResetPassword(body, resetPasswordToken);
      setloadingReset(false);
      if (response.message === "Request failed with status code 404") {
        alertify.error("Token expired or does not exists");
      }
      if (response.data) {
        alertify.success("Password has been reset");
        navigate("/auth/login");
      }
    }
  };
  const handleInputPasswordChange = (e) => {
    const inputValue = e.target.value;
    setInputPasswordValue(inputValue);
    setErrorPassword(false);
  };
  const handleInputPasswordRetypeChange = (e) => {
    const inputValue = e.target.value;
    setInputPasswordRetypeValue(inputValue);
    setErrorPasswordRetype(false);
  };
  return (
    <div className="reset-password-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className="reset-password-header-container">Reset Password</h1>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <TextField
          className="input-password"
          id="outlined-basic"
          label="Şifre"
          variant="outlined"
          type="password"
          onChange={handleInputPasswordChange}
          error={errorPassword}
        />
        <TextField
          id="outlined-password-retype-input"
          label="Şifre Tekrar"
          type="password"
          autoComplete="current-password"
          onChange={handleInputPasswordRetypeChange}
          error={errorPasswordRetype}
        />
        <LoadingButton
          size="small"
          // onClick={handleClick}
          startIcon={<InputIcon />}
          loading={loadingReset}
          loadingPosition="start"
          variant="contained"
          color="success"
          type="submit"
        >
          RESET
        </LoadingButton>
      </form>
      <div className="login-container">
        <Link to="/auth/login">
          <h5 className="login">Login</h5>
        </Link>
      </div>
      <div className="website-info-container">
        <FontAwesomeIcon icon={faCopyright} />
        <h5 className="website-info">Kerbb.com</h5>
      </div>
    </div>
  );
};

export default ResetPassword;
