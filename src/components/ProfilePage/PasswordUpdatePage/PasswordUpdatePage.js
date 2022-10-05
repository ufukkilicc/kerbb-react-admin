import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import "./PasswordUpdatePage.scss";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { authUpdatePassword } from "../../../features/auth/authAPI";
import { getCookie } from "../../../helpers/authHelper";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";

const PasswordUpdatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [newPasswordAgainVisible, setNewPasswordAgainVisible] = useState(false);

  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordAgainError, setNewPasswordAgainError] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
    }
    fetchData();
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
  const handleOldPasswordChange = (e) => {
    setOldPasswordError(false);
    const inputValue = e.target.value;
    setOldPassword(inputValue);
  };
  const handleNewPasswordChange = (e) => {
    setNewPasswordError(false);
    const inputValue = e.target.value;
    setNewPassword(inputValue);
  };
  const handleNewPasswordAgainChange = (e) => {
    setNewPasswordAgainError(false);
    const inputValue = e.target.value;
    setNewPasswordAgain(inputValue);
  };
  const handleOldPasswordVisible = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };
  const handleNewPasswordVisible = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const handleNewPasswordAgainVisible = () => {
    setNewPasswordAgainVisible(!newPasswordAgainVisible);
  };
  const handleSubmit = async () => {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      newPasswordAgain.length === 0
    ) {
      if (oldPassword.length === 0) {
        setOldPasswordError(true);
      } else if (newPassword.length === 0) {
        setNewPasswordError(true);
      } else if (newPasswordAgain.length === 0) {
        setNewPasswordAgainError(true);
      } else {
        setOldPasswordError(true);
        setNewPasswordError(true);
        setNewPasswordAgainError(true);
      }
    } else {
      const token = getCookie("k_t");
      const body = {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_again: newPasswordAgain,
      };
      setSubmitLoading(true);
      const authUpdatePasswordResponse = await authUpdatePassword(token, body);
      setSubmitLoading(false);
      if (authUpdatePasswordResponse.data.tracking_id) {
        alertify.success("Password is Updated");
        navigate("/dashboard/auth/profile");
      } else {
        alertify.error("Bad Request");
      }
    }
  };
  return (
    <div className="password-update-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="password-update-page-header-container">
        <h1 className="password-update-page-header">PASSWORD UPDATE</h1>
      </div>
      <div className="password-update-page-form-container">
        <form className="password-update-page-form">
          <div className="old-password-container">
            <TextField
              id="outlined-basic"
              label="Old Password"
              variant="outlined"
              type={oldPasswordVisible ? "" : "password"}
              onChange={handleOldPasswordChange}
              value={oldPassword}
              error={oldPasswordError}
            />
            <div
              className="old-password-icon-container"
              onClick={handleOldPasswordVisible}
            >
              <RemoveRedEyeIcon />
            </div>
          </div>
          <div className="new-password-container">
            <TextField
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              type={newPasswordVisible ? "" : "password"}
              onChange={handleNewPasswordChange}
              value={newPassword}
              error={newPasswordError}
            />
            <div
              className="new-password-icon-container"
              onClick={handleNewPasswordVisible}
            >
              <RemoveRedEyeIcon />
            </div>
          </div>
          <div className="new-password-again-container">
            <TextField
              id="outlined-basic"
              label="New Password Again"
              variant="outlined"
              type={newPasswordAgainVisible ? "" : "password"}
              onChange={handleNewPasswordAgainChange}
              value={newPasswordAgain}
              error={newPasswordAgainError}
            />
            <div
              className="new-password-again-icon-container"
              onClick={handleNewPasswordAgainVisible}
            >
              <RemoveRedEyeIcon />
            </div>
          </div>
        </form>
        <div className="password-update-page-form-button-container">
          <LoadingButton
            size="small"
            color="primary"
            onClick={handleSubmit}
            loading={submitLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdatePage;
