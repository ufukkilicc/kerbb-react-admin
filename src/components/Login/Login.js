import React, { useEffect, useState } from "react";
import "./Login.scss";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import InputIcon from "@mui/icons-material/Input";
import { authLogin } from "../../features/auth/authAPI";
import { authenticate, isAuth } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    SetPageTitle();
    if (isAuth()) {
      navigate("/dashboard");
    }
  }, []);
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordlValue, setInputPasswordlValue] = useState("");
  const [loadingLogin, setloadingLogin] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

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
    if (inputEmailValue.length == 0) {
      setErrorEmail(true);
    } else if (inputPasswordlValue.length == 0) {
      setErrorPassword(true);
    } else if (inputEmailValue.length == 0 && inputPasswordlValue.length == 0) {
      setErrorEmail(true);
      setErrorPassword(true);
    } else {
      const user_email = inputEmailValue;
      const user_password = inputPasswordlValue;
      const body = { user_email, user_password };
      setloadingLogin(true);
      const response = await authLogin(body);
      setloadingLogin(false);
      if (response.data.token) {
        alertify.success("Login Successful");
        authenticate(response, () => {
          navigate("/dashboard");
        });
      } else {
        const error_message = response.data.response.message;
        alertify.error(`${error_message}`);
      }
    }
  };
  const handleInputEmailChange = (e) => {
    const inputValue = e.target.value;
    setInputEmailValue(inputValue);
    setErrorEmail(false);
  };
  const handleInputPasswordChange = (e) => {
    const inputValue = e.target.value;
    setInputPasswordlValue(inputValue);
    setErrorPassword(false);
  };
  return (
    <div className="login-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className="login-header-container">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          className="input-email"
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          onChange={handleInputEmailChange}
          error={errorEmail}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleInputPasswordChange}
          error={errorPassword}
        />
        <LoadingButton
          size="small"
          // onClick={handleClick}
          startIcon={<InputIcon />}
          loading={loadingLogin}
          loadingPosition="start"
          variant="contained"
          color="success"
          type="submit"
        >
          LOGIN
        </LoadingButton>
      </form>
      <div className="forgot-password-container">
        <Link to="/auth/forgot-password">
          <h5 className="forgot-password">Forgot Password</h5>
        </Link>
      </div>
      <div className="website-info-container">
        <FontAwesomeIcon icon={faCopyright} />
        <h5 className="website-info">Kerbb.com</h5>
      </div>
    </div>
  );
};

export default Login;
