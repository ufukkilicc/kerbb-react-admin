import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./ProfilePageSettingsPage.scss";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthObject,
  updateAuthObject,
} from "../../../features/auth/authSlice";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import CircleIcon from "@mui/icons-material/Circle";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { authProfile, authUpdateProfile } from "../../../features/auth/authAPI";
import { getCookie } from "../../../helpers/authHelper";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

const ProfilePageSettingsPage = () => {
  const dispatch = useDispatch();
  const [pageTitle, setPageTitle] = useState("");

  const [userNameInputValue, setUserNameInputValue] = useState("");
  const [userSurnameInputValue, setUserSurnameInputValue] = useState("");
  const [userEmailInputValue, setUserEmailInputValue] = useState("");
  const [userRolesInputValue, setUserRolesInputValue] = useState([]);
  const [userGroupsInputValue, setUserGroupsInputValue] = useState([]);

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const [userNameInput, setUserNameInput] = useState(false);
  const [userSurnameInput, setUserSurnameInput] = useState(false);
  const [userEmailInput, setUserEmailInput] = useState(false);
  useEffect(() => {
    SetPageTitle();
    async function fetchData() {
      const token = getCookie("k_t");
      const authProfileResponse = await authProfile(token);
      dispatch(updateAuthObject(authProfileResponse.data));
    }
    fetchData();
    setUserNameInputValue(authObject.user_name);
    setUserSurnameInputValue(authObject.user_surname);
    setUserEmailInputValue(authObject.user_email);
    setUserRolesInputValue(authObject.user_roles);
    setUserGroupsInputValue(authObject.user_groups);
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
  const handleEdit = (input) => {
    if (input === "user_name") {
      setUserNameInput(true);
      setUserSurnameInput(false);
      setUserEmailInput(false);
    }
    if (input === "user_surname") {
      setUserNameInput(false);
      setUserSurnameInput(true);
      setUserEmailInput(false);
    }
    if (input === "user_email") {
      setUserNameInput(false);
      setUserSurnameInput(false);
      setUserEmailInput(true);
    }
    if (input === "user_password") {
      setUserNameInput(false);
      setUserSurnameInput(false);
      setUserEmailInput(false);
    }
  };
  const handleCancel = (input) => {
    if (input === "user_name") {
      setUserNameInput(false);
      setUserNameInputValue(authObject.user_name);
    }
    if (input === "user_surname") {
      setUserSurnameInput(false);
      setUserSurnameInputValue(authObject.user_surname);
    }
    if (input === "user_email") {
      setUserEmailInput(false);
      setUserEmailInputValue(authObject.user_email);
    }
  };
  const handleUserNameChange = (e) => {
    const inputValue = e.target.value;
    setUserNameInputValue(inputValue);
  };
  const handleUserSurnameChange = (e) => {
    const inputValue = e.target.value;
    setUserSurnameInputValue(inputValue);
  };
  const handleUserEmailChange = (e) => {
    const inputValue = e.target.value;
    setUserEmailInputValue(inputValue);
  };
  const handleSubmit = async () => {
    const token = getCookie("k_t");
    setSubmitButtonLoading(true);
    const body = {
      user_name:
        userNameInputValue !== authObject.user_name
          ? userNameInputValue
          : undefined,
      user_surname:
        userSurnameInputValue !== authObject.user_surname
          ? userSurnameInputValue
          : undefined,
      user_email:
        userEmailInputValue !== authObject.user_email
          ? userEmailInputValue
          : undefined,
    };
    const authUpdateProfileResponse = await authUpdateProfile(token, body);
    if (authUpdateProfileResponse.data) {
      alertify.success("Updated Profile");
      dispatch(updateAuthObject(authUpdateProfileResponse.data));
      setUserNameInput(false);
      setUserSurnameInput(false);
      setUserEmailInput(false);
    }
    setSubmitButtonLoading(false);
  };
  const authObject = useSelector(getAuthObject);
  return (
    <div className="profile-page-settings-page">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="profile-page-settings-header-container">
        <h1 className="profile-page-settings-header">SETTINGS</h1>
      </div>
      <div className="profile-page-id-container">
        <h2 className="profile-page-id-header">Database ID</h2>
        <h3 className="profile-page-id">
          {Object.keys(authObject).length !== 0 ? authObject._id : ""}
        </h3>
      </div>
      <div className="profile-page-tracking-id-container">
        <h2 className="profile-page-tracking-id-header">Tracking ID</h2>
        <h3 className="profile-page-tracking-id">
          {Object.keys(authObject).length !== 0 ? authObject.tracking_id : ""}
        </h3>
      </div>
      <div className="profile-page-user-name-container">
        <div className="profile-page-user-name-info">
          <h2 className="profile-page-user-name-header">User Name</h2>
          {userNameInput ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={userNameInputValue}
              onChange={handleUserNameChange}
            />
          ) : (
            <h3 className="profile-page-user-name">
              {Object.keys(authObject).length !== 0 ? authObject.user_name : ""}
            </h3>
          )}
        </div>
        <div className="profile-page-user-name-edit-button">
          {userNameInput ? (
            <LoadingButton
              size="small"
              onClick={() => handleCancel("user_name")}
              startIcon={<CancelIcon />}
              loadingPosition="start"
              variant="contained"
              color="error"
            >
              Cancel
            </LoadingButton>
          ) : (
            <LoadingButton
              size="small"
              onClick={() => handleEdit("user_name")}
              startIcon={<EditIcon />}
              loadingPosition="start"
              variant="contained"
              color="warning"
            >
              Edit
            </LoadingButton>
          )}
        </div>
      </div>
      <div className="profile-page-user-surname-container">
        <div className="profile-page-user-surname-info">
          <h2 className="profile-page-user-surname-header">User Surname</h2>
          {userSurnameInput ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={userSurnameInputValue}
              onChange={handleUserSurnameChange}
            />
          ) : (
            <h3 className="profile-page-user-surname">
              {Object.keys(authObject).length !== 0
                ? authObject.user_surname
                : ""}
            </h3>
          )}
        </div>
        <div className="profile-page-user-surname-edit-button">
          {userSurnameInput ? (
            <LoadingButton
              size="small"
              onClick={() => handleCancel("user_surname")}
              startIcon={<CancelIcon />}
              loadingPosition="start"
              variant="contained"
              color="error"
            >
              Cancel
            </LoadingButton>
          ) : (
            <LoadingButton
              size="small"
              onClick={() => handleEdit("user_surname")}
              startIcon={<EditIcon />}
              loadingPosition="start"
              variant="contained"
              color="warning"
            >
              Edit
            </LoadingButton>
          )}
        </div>
      </div>
      <div className="profile-page-user-mail-container">
        <div className="profile-page-user-mail-info">
          <h2 className="profile-page-user-mail-header">User Email</h2>
          {userEmailInput ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={userEmailInputValue}
              onChange={handleUserEmailChange}
            />
          ) : (
            <h3 className="profile-page-user-mail">
              {Object.keys(authObject).length !== 0
                ? authObject.user_email
                : ""}
            </h3>
          )}
        </div>
        <div className="profile-page-user-mail-edit-button">
          {userEmailInput ? (
            <LoadingButton
              size="small"
              onClick={() => handleCancel("user_email")}
              startIcon={<CancelIcon />}
              loadingPosition="start"
              variant="contained"
              color="error"
            >
              Cancel
            </LoadingButton>
          ) : (
            <LoadingButton
              size="small"
              onClick={() => handleEdit("user_email")}
              startIcon={<EditIcon />}
              loadingPosition="start"
              variant="contained"
              color="warning"
            >
              Edit
            </LoadingButton>
          )}
        </div>
      </div>
      <div className="profile-page-user-password-container">
        <div className="profile-page-user-password-info">
          <h2 className="profile-page-user-password-header">User Password</h2>
          <h3 className="profile-page-user-password">
            <div className="profile-page-user-password-icon">
              <CircleIcon fontSize="small" />
            </div>
            <div className="profile-page-user-password-icon">
              <CircleIcon fontSize="small" />
            </div>
            <div className="profile-page-user-password-icon">
              <CircleIcon fontSize="small" />
            </div>
            <div className="profile-page-user-password-icon">
              <CircleIcon fontSize="small" />
            </div>
            <div className="profile-page-user-password-icon">
              <CircleIcon fontSize="small" />
            </div>
          </h3>
        </div>
        <div className="profile-page-user-password-edit-button">
          <Link to="/dashboard/auth/profile/update-password">
            <LoadingButton
              size="small"
              startIcon={<EditIcon />}
              loadingPosition="start"
              variant="contained"
              color="warning"
            >
              Edit
            </LoadingButton>
          </Link>
        </div>
      </div>
      <div className="profile-page-user-roles-container">
        <div className="profile-page-user-roles-info">
          <h2 className="profile-page-user-roles-header">User Roles</h2>
          <ul className="profile-page-user-roles-list">
            {authObject.user_roles ? (
              authObject.user_roles.map((role) => {
                return (
                  <h3 className="profile-page-user-roles-item" key={role._id}>
                    {role.role_name}
                  </h3>
                );
              })
            ) : (
              <div></div>
            )}
          </ul>
        </div>
        <div className="profile-page-user-roles-edit-button">
          {/* <LoadingButton
            size="small"
            // onClick={handleClick}
            startIcon={<EditIcon />}
            loadingPosition="start"
            variant="contained"
            color="warning"
          >
            Edit
          </LoadingButton> */}
        </div>
      </div>
      <div className="profile-page-user-groups-container">
        <div className="profile-page-user-groups-info">
          <h2 className="profile-page-user-groups-header">User Groups</h2>
          <ul className="profile-page-user-groups-list">
            {authObject.group_roles ? (
              authObject.group_roles.map((group) => {
                return (
                  <h3 className="profile-page-user-groups-item">
                    {group.group_name}
                  </h3>
                );
              })
            ) : (
              <div></div>
            )}
          </ul>
        </div>
        <div className="profile-page-user-groups-edit-button">
          {/* <LoadingButton
            size="small"
            // onClick={handleClick}
            startIcon={<EditIcon />}
            loadingPosition="start"
            variant="contained"
            color="warning"
          >
            Edit
          </LoadingButton> */}
        </div>
      </div>
      <div className="button-container">
        <LoadingButton
          size="small"
          color="primary"
          onClick={handleSubmit}
          loading={submitButtonLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </LoadingButton>
      </div>
    </div>
  );
};

export default ProfilePageSettingsPage;
