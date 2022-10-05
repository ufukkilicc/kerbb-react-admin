import React, { useEffect, useState } from "react";
import "./ForgotPassword.scss";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import InputIcon from "@mui/icons-material/Input";
import alertify from "alertifyjs";
import { Helmet } from "react-helmet";
import { authForgotPassword } from "../../features/auth/authAPI";
import Countdown from "react-countdown";
import ReactDOM from "react-dom";

const ForgotPassword = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [loadingForgotPassword, setLoadingForgotPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [countDown, setCountDown] = useState(false);
  const [counterEnd, setCounterEnd] = useState(false);
  useEffect(() => {
    SetPageTitle();
  });
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
    if (inputEmailValue.length === 0) {
      setErrorEmail(true);
    } else {
      const user_email = inputEmailValue;
      const body = { user_email };
      setLoadingForgotPassword(true);
      const response = await authForgotPassword(body);
      setLoadingForgotPassword(false);
      if (response.message === "Request failed with status code 404") {
        alertify.error("Mail not found");
      }
      if (response.data.messageId) {
        alertify.success("Mail sent");
        setCountDown(true);
      }
    }
  };
  const handleInputEmailChange = (e) => {
    const inputValue = e.target.value;
    setInputEmailValue(inputValue);
    setErrorEmail(false);
  };
  const handleComplete = () => {
    setCounterEnd(true);
  };
  return (
    <div className="forgot-password-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className="forgot-password-header-container">Forgot Password</h1>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <TextField
          className="input-email"
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          onChange={handleInputEmailChange}
          error={errorEmail}
        />
        <LoadingButton
          size="small"
          // onClick={handleClick}
          startIcon={<InputIcon />}
          loading={loadingForgotPassword}
          loadingPosition="start"
          variant="contained"
          color="success"
          type="submit"
        >
          SEND
        </LoadingButton>
      </form>
      {countDown ? (
        <div
          className={
            counterEnd ? "count-down-container" : "count-down-container-active"
          }
        >
          <Countdown
            date={Date.now() + 3600000}
            onComplete={handleComplete}
            autoStart
          />
        </div>
      ) : (
        <div></div>
      )}
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

export default ForgotPassword;
